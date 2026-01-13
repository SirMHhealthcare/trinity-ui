export type TestimonialType = "text" | "image" | "video" | "facebook-video";

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
  facebookEmbedUrl?: string; // For Facebook video embeds (the src from iframe)
  googleReviewUrl?: string; // Optional: link to view the review on Google
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Prashant Tiwari",
    location: "Stevenage, United Kingdom",
    image: "",
    rating: 5,
    text: "Trinity Homeopathy has turned out to be a blessing for me. Dr. Mohsin's treatment for me was so effective that it totally eradicated this disease without any side effects. Over the online consultation, service, Dr. Mohsin took time to listen patiently and understand my concerns in detail, rather than rushing to prescribe something quickly. That itself built a lot of confidence for me.The approach felt holistic and personalised, and the treatment plan was explained clearly. I Highly recommended their service!! A big thank you to their team. 🙏",
    type: "text",
    googleReviewUrl: "https://maps.app.goo.gl/yMyVrzh8RMP6czEN8",
  },
  {
    id: "2",
    name: "Surendra Jaga",
    location: "Jaipur, Rajasthan",
    image: "",
    rating: 5,
    text: "I have consulted to Dr. Mohsin khan for my headache issue he prescribed me homeopathic medicine which was very effective to me. Thanks to Dr. Mohsin khan and highly recommended.",
    type: "text",
    googleReviewUrl: "https://share.google/JZrwwSiM1dsGttepp",
  },
  {
    id: "3",
    name: "Bittu Sharma",
    location: "Jaipur, Rajasthan",
    image: "",
    rating: 5,
    text: "I was suffering from severe pain abdomen with acid reflex symptoms from last few months I consulted to Dr Mohsin khan and took treatment I found homeopathy really effective for me it vanished all symptoms with out any side effect I want to thanks Dr Mohsin khan.",
    type: "text",
    googleReviewUrl: "https://share.google/E6Igx0sTj3MJTuAP6",
  },
  {
    id: "4",
    name: "Abhishek Gora",
    location: "Jaipur, Rajasthan",
    image: "",
    rating: 5,
    text: "I had cystic acne on my face and I have been to many allopathic doctors but didn't get any relief finally I took my treatment from Dr. Mohsin Khan and now my face is clear and I also got improvement in my general health It's really appreciating and thanks to Dr. Mohsin khan 🙏",
    type: "text",
    googleReviewUrl: "https://share.google/OKRC1xPbtibLWHoe4",
  },
  {
    id: "5",
    name: "Vijay Kumawat",
    location: "Jaipur, Rajasthan",
    image: "",
    rating: 5,
    text: "I was suffering from eczema from many years took allopathic medicine for a long but didn't get any relief finally I approached to trinity homeopathy just in few months of treatment found relief in my skin condition now I am feeling much better I really want to thanks Dr. Mohsin khan for their kind support and treatment. 🙏",
    type: "text",
    googleReviewUrl: "https://share.google/vV4Z5X4x9msfptha0",
  },
  {
    id: "6",
    name: "Riyazuddin",
    location: "Jaipur, Rajasthan",
    image: "",
    rating: 5,
    text: "My recovery journey with Dr. Mohsin Khan's homeopathic treatment! 🙏",
    type: "facebook-video",
    facebookEmbedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1218022670281159%2F&show_text=false&width=476&t=0",
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

// Example Facebook video testimonial structure:
// {
//   id: "9",
//   name: "Patient Name",
//   location: "City",
//   image: "avatar-url",
//   rating: 5,
//   text: "Short caption",
//   type: "facebook-video",
//   facebookEmbedUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1218022670281159%2F&show_text=false&width=476&t=0",
//   thumbnailUrl: "optional-thumbnail.jpg", // Optional: shows as card before clicking
// }
