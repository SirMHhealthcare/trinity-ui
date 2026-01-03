import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { ChevronDown, ChevronUp, Calendar, Search, RefreshCw, AlertCircle } from "lucide-react";
import { useAppointments, Appointment } from "@/hooks/useAppointments";
import { adminConfig, adminContent } from "@/config/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const getStatusVariant = (status: Appointment["status"]) => {
  switch (status) {
    case "SCHEDULED":
    case "CONFIRMED":
      return "default";
    case "IN_PROGRESS":
      return "secondary";
    case "COMPLETED":
      return "outline";
    case "CANCELLED":
    case "NO_SHOW":
      return "destructive";
    case "RESCHEDULED":
      return "secondary";
    default:
      return "default";
  }
};

const formatDateTime = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    return {
      date: format(date, "dd MMM yyyy"),
      time: format(date, "hh:mm a"),
      full: format(date, "dd MMM yyyy, hh:mm a"),
    };
  } catch {
    return { date: "-", time: "-", full: "-" };
  }
};

interface AppointmentRowProps {
  appointment: Appointment;
  isExpanded: boolean;
  onToggle: () => void;
}

const AppointmentRow = ({ appointment, isExpanded, onToggle }: AppointmentRowProps) => {
  const dateTime = formatDateTime(appointment.appointmentDateTime);
  const createdAt = formatDateTime(appointment.createdAt);
  const updatedAt = formatDateTime(appointment.updatedAt);
  const labels = adminContent.table.expandedDetails;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <TableRow 
        className="cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <TableCell className="font-mono text-xs">{appointment.appointmentRef}</TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium">{dateTime.date}</span>
            <span className="text-xs text-muted-foreground">{dateTime.time}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant={getStatusVariant(appointment.status)}>
            {adminContent.status[appointment.status]}
          </Badge>
        </TableCell>
        <TableCell className="max-w-[200px] truncate">
          {appointment.symptoms || adminContent.table.noSymptoms}
        </TableCell>
        <TableCell className="font-mono text-xs">{appointment.doctorId}</TableCell>
        <TableCell>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </TableCell>
      </TableRow>
      <CollapsibleContent asChild>
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell colSpan={6} className="p-0">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{labels.id}:</span>
                <p className="font-mono text-xs break-all">{appointment.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.appointmentRef}:</span>
                <p className="font-mono">{appointment.appointmentRef}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.doctorId}:</span>
                <p className="font-mono">{appointment.doctorId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.appointmentDateTime}:</span>
                <p>{dateTime.full}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.status}:</span>
                <p>
                  <Badge variant={getStatusVariant(appointment.status)}>
                    {adminContent.status[appointment.status]}
                  </Badge>
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.symptoms}:</span>
                <p>{appointment.symptoms || adminContent.table.noSymptoms}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.meetingLink}:</span>
                <p>
                  {appointment.meetingLink ? (
                    <a 
                      href={appointment.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {appointment.meetingLink}
                    </a>
                  ) : (
                    adminContent.table.noMeetingLink
                  )}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.createdAt}:</span>
                <p>{createdAt.full}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{labels.updatedAt}:</span>
                <p>{updatedAt.full}</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </Collapsible>
  );
};

const AdminPage = () => {
  const { appointments, isLoading, error, refetch } = useAppointments();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // Filter by search query
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        apt.appointmentRef.toLowerCase().includes(query) ||
        apt.symptoms?.toLowerCase().includes(query) ||
        apt.doctorId.toLowerCase().includes(query) ||
        apt.status.toLowerCase().includes(query);

      // Filter by date
      const matchesDate =
        !selectedDate ||
        format(parseISO(apt.appointmentDateTime), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd");

      return matchesSearch && matchesDate;
    });
  }, [appointments, searchQuery, selectedDate]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDate(undefined);
  };

  const hasActiveFilters = searchQuery || selectedDate;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{adminConfig.pageTitle}</h1>
          <p className="text-muted-foreground mt-1">
            {adminConfig.appointmentsSection.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={adminContent.filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[200px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate
                  ? format(selectedDate, "dd MMM yyyy")
                  : adminContent.filters.datePlaceholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={handleClearFilters}>
              {adminContent.filters.clearFilters}
            </Button>
          )}
          <Button variant="outline" onClick={refetch} disabled={isLoading}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span>{adminContent.table.error}: {error}</span>
          </div>
        )}

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>{adminContent.table.headers.appointmentRef}</TableHead>
                <TableHead>{adminContent.table.headers.dateTime}</TableHead>
                <TableHead>{adminContent.table.headers.status}</TableHead>
                <TableHead>{adminContent.table.headers.symptoms}</TableHead>
                <TableHead>{adminContent.table.headers.doctorId}</TableHead>
                <TableHead className="w-[50px]">{adminContent.table.headers.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {adminContent.table.loading}
                  </TableCell>
                </TableRow>
              ) : filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {adminContent.table.noData}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                    isExpanded={expandedId === appointment.id}
                    onToggle={() =>
                      setExpandedId(expandedId === appointment.id ? null : appointment.id)
                    }
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
