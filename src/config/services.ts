// Treatments are defined by folders in src/content/treatments/ (see the README there).
// This list is derived from them so existing consumers (e.g. the footer) keep working.
import { treatments } from "@/lib/treatments";

export interface Service {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

export const services: Service[] = treatments.map(t => ({
  id: t.id,
  title: t.title,
  description: t.summary,
  imagePath: t.image,
}));
