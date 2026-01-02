export type TestimonialType = "text" | "image" | "video";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  type: TestimonialType;
  mediaUrl?: string; // For image/video testimonials
  thumbnailUrl?: string; // For video thumbnails
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Jaipur",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Dr. Mohsin Khan ने मेरी thyroid की problem बिना किसी side effect के ठीक की। 3 महीने में मेरी reports normal आ गईं। बहुत धन्यवाद! 🙏",
    type: "text",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    location: "Jodhpur",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "मुझे 2 साल से कमर दर्द था। जब कुछ काम नहीं आया, homeopathic treatment ने राहत दी।",
    type: "text",
  },
  {
    id: "3",
    name: "Sunita Devi",
    location: "Ajmer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "मेरी बेटी को बहुत allergies थीं। Dr. Mohsin Khan के treatment से उसकी immunity बढ़ी और अब वो काफ़ी healthy है!",
    type: "text",
  },
  {
    id: "4",
    name: "Nikhil Mishra",
    location: "Jaipur",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    rating: 5,
    text: "Dr. Mohsin Khan। बहुत धन्यवाद! 🙏",
    type: "text",
  },
  {
    id: "5",
    name: "Kaushal Goyal",
    location: "Jodhpur",
    image: "https://randomuser.me/api/portraits/men/89.jpg",
    rating: 5,
    text: "Dr. Mohsin Khan। बहुत धन्यवाद! 🙏",
    type: "text",
  },
  {
    id: "6",
    name: "Jodha Devi",
    location: "Ajmer",
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    rating: 5,
    text: "मेरी बेटी को बहुत कमर दर्द था। Dr. Mohsin Khan के treatment ने राहत दी!",
    type: "text",
  },
];

// Example image testimonial structure:
// {
//   id: "7",
//   name: "Patient Name",
//   location: "City",
//   image: "avatar-url",
//   rating: 5,
//   text: "Short caption",
//   type: "image",
//   mediaUrl: "before-after-image-url.jpg",
// }

// Example video testimonial structure:
// {
//   id: "8",
//   name: "Patient Name",
//   location: "City",
//   image: "avatar-url",
//   rating: 5,
//   text: "Short caption",
//   type: "video",
//   mediaUrl: "video-url.mp4",
//   thumbnailUrl: "video-thumbnail.jpg",
// }
