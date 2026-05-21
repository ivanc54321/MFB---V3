export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "News" | "Impact Story" | "Recipe" | "Event";
  readTime: string;
  date: string;
  author: string;
  image: string;
  likes: number;
  commentsCount: number;
  tags?: string[];
}

export interface VolunteerRole {
  id: string;
  title: string;
  category: "Pantry" | "Mobile Food Truck" | "Community Garden" | "Logistics" | "Office Support" | "Event Planning";
  description: string;
  requiredSkills: string[];
  impactDescription: string;
  spotsRemaining: number;
  shifts: string[];
}

export interface VolunteerSignup {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  county: string;
  shift: string;
  date: string;
}

export interface DonationRecord {
  id: string;
  amount: number;
  frequency: "one-time" | "monthly";
  donorName: string;
  donorEmail: string;
  isTribute: boolean;
  tributeName?: string;
  date: string;
}

export interface MemberFoodBank {
  id: string;
  name: string;
  hqCity: string;
  regionServed: string;
  countiesCovered: string[];
  description: string;
  website: string;
  phone: string;
  mealsDistributedMillions: number;
  householdsServedAnnually: number;
  colorHex: string;
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  matchIngredients: string[];
  otherIngredients: string[];
  instructions: string[];
  tips: string;
}
