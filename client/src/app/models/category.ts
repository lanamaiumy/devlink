import { Link } from "./link";

export interface Category {
  id: number;
  name: string;
  links: Link[];
  isExpanded?: boolean;
}