import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, CheckCircle2, ArrowRight, ArrowLeft, Loader2, CalendarPlus, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";
import { format, addMonths, isToday, parse, isBefore } from "date-fns";
import { bookingConfig, bookingContent } from "@/config";

const BookingSection = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    concern: "",
    date: "",
    time: "",
  });
  const [formErrors, setFormErrors] = useState({
    phone: "",
    email: "",
    age: "",
  });
  const [bookingConfirmation, setBookingConfirmation] = useState({
    bookingId: "",
    appointmentRef: "",
  });

  const { slots, isLoading, bookSlot } = useAvailableSlots(formData.date);

  // Update formData.date when calendar date changes
  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({ 
        ...prev, 
        date: format(selectedDate, "yyyy-MM-dd"),
        time: "" // Reset time when date changes
      }));
    }
  }, [selectedDate]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "phone":
        // Allow +, digits, and spaces
        if (value && !/^\+?[\d\s]+$/.test(value)) {
          return bookingContent.form.validation.phoneInvalid;
        }
        if (value && value.replace(/\s/g, "").length < 10) {
          return bookingContent.form.validation.phoneMinDigits;
        }
        return "";
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return bookingContent.form.validation.emailInvalid;
        }
        return "";
      case "age":
        if (value && (!/^\d+$/.test(value) || parseInt(value) < 1 || parseInt(value) > 120)) {
          return bookingContent.form.validation.ageInvalid;
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change for phone, email, age
    if (["phone", "email", "age"].includes(name)) {
      setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Convert 12-hour time to 24-hour format for API
  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours) + 12);
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const handleBookAppointment = async () => {
    setIsBooking(true);
    try {
      const time24h = convertTo24Hour(formData.time);
      const appointmentDateTime = `${formData.date}T${time24h}:00`;

      const response = await fetch(`${bookingConfig.apiBaseUrl}/api/v1/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: formData.name,
          patientAge: formData.age ? parseInt(formData.age) : undefined,
          patientGender: formData.gender || undefined,
          patientPhoneNumber: formData.phone,
          patientEmail: formData.email,
          symptoms: formData.concern || undefined,
          doctorId: bookingConfig.doctorId,
          appointmentDateTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Appointment booking failed");
      }

      const data = await response.json();
      
      bookSlot(formData.date, formData.time);
      setBookingConfirmation({
        bookingId: data.id || `BK${Date.now()}`,
        appointmentRef: data.appointmentRef || "",
      });
      setStep(3); // Go to confirmation step
      
      toast({
        title: bookingContent.toasts.bookingSuccess.title,
        description: bookingContent.toasts.bookingSuccess.description,
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: bookingContent.toasts.bookingFailed.title,
        description: bookingContent.toasts.bookingFailed.description,
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.email) {
        toast({
          title: bookingContent.toasts.fillRequired.title,
          variant: "destructive",
        });
        return;
      }
      // Validate fields before proceeding
      const phoneError = validateField("phone", formData.phone);
      const emailError = validateField("email", formData.email);
      const ageError = validateField("age", formData.age);
      
      if (phoneError || emailError || ageError) {
        setFormErrors({ phone: phoneError, email: emailError, age: ageError });
        toast({
          title: bookingContent.toasts.fixValidation.title,
          variant: "destructive",
        });
        return;
      }
    }
    if (step === 2 && (!formData.date || !formData.time)) {
      toast({
        title: bookingContent.toasts.selectDateTime.title,
        variant: "destructive",
      });
      return;
    }
    // From step 2, book appointment instead of going to payment
    if (step === 2) {
      handleBookAppointment();
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Date constraints: today to X months from now
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  const maxDate = addMonths(new Date(), bookingConfig.maxAdvanceBookingMonths);

  return (
    <section id="booking" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            {bookingContent.sectionBadge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {bookingContent.sectionTitle}
          </h2>
          <p className="text-muted-foreground text-lg">
            {bookingContent.sectionSubtitle}
          </p>
        </div>

        {/* Progress Steps - Now 3 steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 md:gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-8 md:w-16 h-1 mx-1 md:mx-2",
                      step > s ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card">
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {bookingContent.steps.personal.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{bookingContent.steps.personal.stepLabel}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {bookingContent.form.labels.name}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={bookingContent.form.placeholders.name}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {bookingContent.form.labels.age}
                    </label>
                    <Input
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder={bookingContent.form.placeholders.age}
                      className={cn("h-12", formErrors.age && "border-destructive")}
                    />
                    {formErrors.age && (
                      <p className="text-destructive text-xs mt-1">{formErrors.age}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {bookingContent.form.labels.gender}
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {bookingContent.form.genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {bookingContent.form.labels.phone}
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={bookingContent.form.placeholders.phone}
                      className={cn("h-12", formErrors.phone && "border-destructive")}
                    />
                    {formErrors.phone && (
                      <p className="text-destructive text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {bookingContent.form.labels.email}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={bookingContent.form.placeholders.email}
                    className={cn("h-12", formErrors.email && "border-destructive")}
                  />
                  {formErrors.email && (
                    <p className="text-destructive text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {bookingContent.form.labels.concern}
                  </label>
                  <Textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    placeholder={bookingContent.form.placeholders.concern}
                    rows={3}
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={nextStep}>
                  {bookingContent.buttons.next}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {bookingContent.steps.dateTime.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{bookingContent.steps.dateTime.stepLabel}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {bookingContent.form.labels.selectDate}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>{bookingContent.form.placeholders.selectDate}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const compareDate = new Date(date);
                          compareDate.setHours(0, 0, 0, 0);
                          return compareDate < today || date > maxDate;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {bookingContent.form.labels.selectTime}
                  </label>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="ml-2 text-muted-foreground">{bookingContent.messages.slotsLoading}</span>
                    </div>
                  ) : !formData.date ? (
                    <p className="text-muted-foreground text-center py-4">
                      {bookingContent.messages.selectDateFirst}
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {slots.map((slot) => {
                        // Check if slot is in the past (only relevant for today)
                        const isSlotInPast = selectedDate && isToday(selectedDate) && (() => {
                          const slotTime = parse(slot.time, "hh:mm a", new Date());
                          const now = new Date();
                          slotTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
                          return isBefore(slotTime, now);
                        })();
                        
                        const isDisabled = slot.isBooked || isSlotInPast;
                        
                        return (
                          <button
                            key={slot.time}
                            onClick={() => !isDisabled && setFormData({ ...formData, time: slot.time })}
                            disabled={isDisabled}
                            className={cn(
                              "p-3 rounded-xl border text-center transition-all text-sm",
                              isDisabled
                                ? "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50 line-through"
                                : formData.time === slot.time
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border hover:border-primary/50"
                            )}
                          >
                            {slot.time}
                            {slot.isBooked && <span className="block text-xs">{bookingContent.messages.booked}</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" size="lg" className="flex-1" onClick={prevStep}>
                    <ArrowLeft className="w-5 h-5" />
                    {bookingContent.buttons.back}
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="flex-1" 
                    onClick={nextStep}
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {bookingContent.buttons.booking}
                      </>
                    ) : (
                      <>
                        {bookingContent.buttons.bookAppointment}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                {/* Success Header */}
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                    {bookingContent.steps.confirmation.title}
                  </h3>
                  {bookingConfirmation.appointmentRef && (
                    <p className="text-muted-foreground">
                      {bookingContent.confirmation.labels.ref} <span className="font-mono font-semibold text-foreground">{bookingConfirmation.appointmentRef}</span>
                    </p>
                  )}
                </div>

                {/* Booking Details */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bookingContent.confirmation.labels.name}</span>
                    <span className="font-medium text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bookingContent.confirmation.labels.date}</span>
                    <span className="font-medium text-foreground">
                      {formData.date && new Date(formData.date).toLocaleDateString("hi-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bookingContent.confirmation.labels.time}</span>
                    <span className="font-medium text-foreground">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bookingContent.confirmation.labels.email}</span>
                    <span className="font-medium text-foreground">{formData.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Add to Calendar */}
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      const time24h = convertTo24Hour(formData.time);
                      const startDate = new Date(`${formData.date}T${time24h}:00`);
                      const endDate = new Date(startDate.getTime() + bookingConfig.appointmentDurationMinutes * 60000);
                      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(bookingContent.calendar.eventTitle)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(bookingContent.calendar.eventDetails)}`;
                      window.open(googleCalendarUrl, "_blank");
                    }}
                  >
                    <CalendarPlus className="w-5 h-5" />
                    {bookingContent.buttons.addToCalendar}
                  </Button>

                  {/* Share on WhatsApp */}
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
                    onClick={() => {
                      const dateStr = formData.date && new Date(formData.date).toLocaleDateString("hi-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      });
                      const message = bookingContent.whatsApp.messageTemplate(
                        dateStr || "",
                        formData.time,
                        bookingConfirmation.appointmentRef,
                        formData.email
                      );
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {bookingContent.buttons.shareWhatsApp}
                  </Button>
                </div>

                {/* Confirmation Notice */}
                <div className="flex items-start gap-3 bg-accent/10 rounded-xl p-4 text-sm">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    {bookingContent.messages.confirmationNotice}
                  </p>
                </div>

                {/* Book Another */}
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setStep(1);
                    setSelectedDate(undefined);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      age: "",
                      gender: "",
                      concern: "",
                      date: "",
                      time: "",
                    });
                    setFormErrors({ phone: "", email: "", age: "" });
                    setBookingConfirmation({ bookingId: "", appointmentRef: "" });
                  }}
                >
                  {bookingContent.buttons.bookAnother}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
