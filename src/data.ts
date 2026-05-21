import { BlogPost, VolunteerRole, MemberFoodBank, Recipe } from "./types";

export const MEMBER_FOOD_BANKS: MemberFoodBank[] = [
  {
    id: "shop-1",
    name: "Mi Food Bank (Shop 1)",
    hqCity: "Margate",
    regionServed: "Thanet/Margate",
    countiesCovered: ["Margate", "Thanet"],
    description: "Our main hub, providing low-priced food, household goods, and support to the local community. Open to everyone, no membership or benefits required.",
    website: "https://www.micommunity.co.uk",
    phone: "Contact via Email",
    mealsDistributedMillions: 1.2,
    householdsServedAnnually: 15000,
    colorHex: "#1E3F20", // Deep brand green
  },
  {
    id: "shop-2",
    name: "Mi Food Bank (Shop 2)",
    hqCity: "Margate",
    regionServed: "Ramsgate Road Area",
    countiesCovered: ["Margate", "Ramsgate"],
    description: "Our second location offering the same great low-priced food, household goods, and community support. Open to everyone.",
    website: "https://www.micommunity.co.uk",
    phone: "Contact via Email",
    mealsDistributedMillions: 0.8,
    householdsServedAnnually: 10000,
    colorHex: "#c95d41", // Warm brand secondary
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: "warehouse-sort",
    title: "Surplus Food Sorter & Packer",
    category: "Pantry",
    description: "Help us inspect, sort, and box donated canned goods, fresh harvest produce, and dairy products at our main regional sorting facility. Every box sorted goes straight to families and neighboring food pantries.",
    requiredSkills: ["Bending and lifting (up to 25 lbs) preferred", "Team player", "Enthusiastic and fast hands!"],
    impactDescription: "A single 3-hour shift sorts up to 1,200 pounds of food, which provides over 1,000 community meals.",
    spotsRemaining: 14,
    shifts: ["Morning Shift (09:00 AM - 12:00 PM)", "Afternoon Shift (01:00 PM - 04:00 PM)", "Evening Shift (05:30 PM - 08:30 PM)"]
  },
  {
    id: "mobile-pantry-truck",
    title: "Mobile Drive-Thru Pantry Team",
    category: "Mobile Food Truck",
    description: "Bring food assistance directly to rural and high-impact areas. Hand out loaded boxes of fresh milk, produce, and staple products directly to families in drive-thru vehicle queues.",
    requiredSkills: ["Works well outdoors in multiple weather conditions", "Friendly personality", "Comfortable with standing"],
    impactDescription: "Mobile pantries serve 200+ local families in a single morning, removing transportation barriers around Margate.",
    spotsRemaining: 8,
    shifts: ["Morning Rush (08:00 AM - 12:30 PM)", "Midday Distribution (12:00 PM - 04:00 PM)"]
  },
  {
    id: "community-garden-tender",
    title: "Urban Farm & Community Garden Tender",
    category: "Community Garden",
    description: "Get your hands dirty while nurturing fresh vegetables! Help plant, weed, water, and harvest organic tomatoes, greens, carrots, and sweet potatoes that enrich local families' nutrition baskets.",
    requiredSkills: ["Love of the outdoors", "Basic gardening knowledge is a plus (but not required!)", "Comfortable with kneeling"],
    impactDescription: "Supplies seasonal organic produce to neighboring community kitchens that lack access to affordable fresh food.",
    spotsRemaining: 6,
    shifts: ["Sunrise Garden Session (07:30 AM - 10:30 AM)", "Afternoon Seedling Setup (02:00 PM - 05:00 PM)"]
  },
  {
    id: "clerical-advocacy",
    title: "Community Outreach & Office Support",
    category: "Office Support",
    description: "Assist with answer lines, guide families to neighborhood assistance, coordinate donor outreach letters, and handle basic database updates to keep our hunger prevention programs running optimally.",
    requiredSkills: ["Basic computer skills", "Warm and empathetic telephone service manner", "Attention to detail"],
    impactDescription: "Safeguards the communications channel, ensuring families in emergency situations find food pantries immediately.",
    spotsRemaining: 4,
    shifts: ["Weekday Morning (09:00 AM - 01:00 PM)", "Weekday Afternoon (01:00 PM - 05:00 PM)"]
  },
  {
    id: "food-rescue-driver",
    title: "Food Rescue Co-Pilot",
    category: "Logistics",
    description: "Ride along with our professional drivers to collect surplus bread, prepared food, and perishables from corporate caterers, restaurants, and local culinary shops for prompt processing.",
    requiredSkills: ["Ability to move quickly", "Great navigational awareness", "Punctual and reliable"],
    impactDescription: "Prevents high-quality, high-protein restaurant meals from reaching landfills, redirecting them to shelters.",
    spotsRemaining: 3,
    shifts: ["Early Morning Run (06:30 AM - 10:30 AM)", "Late Night Rescue (08:30 PM - 11:30 PM)"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Margate Farm to Family: Harnessing the Summer Harvest",
    excerpt: "How a new collaboration between local Kent growers and Mi Food Bank is bringing fresh fruit to our shops.",
    category: "News",
    readTime: "4 min read",
    date: "May 18, 2026",
    author: "Elena Vasquez, Agricultural Liaison",
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=800",
    content: "Our region has an abundance of agricultural richness, yet food insecurity persists. In a groundbreaking joint effort, local farmers are pledging surplus seasonal products directly to Mi Food Bank. Instead of allowing valuable crops to go unused due to supply-chain friction, we route vans directly to farms. The result? Over 4,500 pounds of pristine, vitamin-rich fruit distributed to Margate households in the past month alone. Read on to learn how this model is scaling up for the autumn harvest.",
    likes: 34,
    commentsCount: 3,
    tags: ["Farming", "Fresh Produce", "Local Agriculture"]
  },
  {
    id: "2",
    title: "A Father's Gratitude: How Mobile Pantries Kept us Whole",
    excerpt: "Marcus, a resident of Genesee County, shares his journey of overcoming a sudden layoff with the help of local emergency drive-thru food drops.",
    category: "Impact Story",
    readTime: "5 min read",
    date: "May 12, 2026",
    author: "Marcus T., Community Voice",
    image: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&q=80&w=800",
    content: "When the plant downscaled operations, I suddenly found myself with £40 in my checking account and three growing kids to feed. The shame was paralyzing. Then, a flyer from a local community group pointed me to Mi Food Bank. The volunteers didn't judge me. They smiled, asked how I was, and loaded thirty pounds of premium potatoes, milk crates, canned beans, and fresh grapes into my bag. That food bridge didn't just nourish our bodies—it restored my hope. Today, I'm back on my feet and signed up as a regular volunteer to give back to the network that kept my family floating.",
    likes: 58,
    commentsCount: 7,
    tags: ["Testimonial", "Mobile Pantry", "Family Support"]
  },
  {
    id: "3",
    title: "5 Nutritious Meals You Can Whip Up From Food Pantry Staples",
    excerpt: "No-fuss, high-protein recipes using simple staple items like brown rice, canned chick peas, and canned tomatoes.",
    category: "Recipe",
    readTime: "6 min read",
    date: "May 05, 2026",
    author: "Chef Darren Miller, Community Nutritionist",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    content: "Food pantry staple items—like canned beans, dried grains, tinned fish, and canned tomatoes—can become high-nutrition, five-star family dinners with the right strategies. By incorporating simple herbs, local root crops, and robust cooking techniques, you can turn low-shelf-cost items into hearty stews, baked casseroles, or skillet hashes. In this article, our culinary department explores five incredible, kid-friendly budget recipes complete with calorie metrics, substitution options, and storage advice.",
    likes: 42,
    commentsCount: 4,
    tags: ["Easy Recipes", "Nutrition", "Budget Cooking"]
  },
  {
    id: "4",
    title: "Upgrading Margate's Food Security Infrastructure: Cold Storage Expansion",
    excerpt: "Federal allocations and private benefactors fund a major state-wide installation of energy-efficient walk-in coolers.",
    category: "News",
    readTime: "3 min read",
    date: "April 28, 2026",
    author: "Sarah Sterling, Director of Strategy",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    content: "The bottleneck in fresh food distributions has never been supply—it is spoilage. Perishable agricultural items like dairy, milk, fresh meat, and raw leafy greens demand unbroken temperature controls. We are ecstatic to announce a massive infrastructure upgrade funding energy-efficient cold vaults and walk-in refrigerators in our Margate shops. This vital advancement will dramatically minimize food waste, allowing member agencies to store fresh items up to three times longer.",
    likes: 21,
    commentsCount: 1,
    tags: ["Infrastructure", "Cold Storage", "Sustainability"]
  }
];

export const PANTRY_RECIPES: Recipe[] = [
  {
    id: "r1",
    title: "Savory Three-Bean Skillet Chili",
    prepTime: "10 mins",
    cookTime: "20 mins",
    difficulty: "Easy",
    matchIngredients: ["canned beans", "canned tomatoes", "onion"],
    otherIngredients: ["chili powder", "garlic", "vegetable oil", "salt"],
    instructions: [
      "Dice the onions and mince the garlic.",
      "Heat a splash of oil in a large skillet. Cook the onion until soft and golden, about 5 minutes. Add garlic and cook 1 more minute.",
      "Drain and rinse the three-bean tins (kidney, pinto, black beans are excellent). Add them to the skillet.",
      "Pour in the canned tomatoes with their juices. Stir in 2 tablespoons of chili powder and a pinch of salt.",
      "Simmer uncovered on medium-low for 15 minutes, allowing details to thicken. Serve hot as is, over boiled rice, or with crackers."
    ],
    tips: "If you have a pinch of sugar, stir it in with the tomatoes to balance the acidity!"
  },
  {
    id: "r2",
    title: "Creamy Potato & Garlic Mash Stew",
    prepTime: "15 mins",
    cookTime: "25 mins",
    difficulty: "Easy",
    matchIngredients: ["potatoes", "onion", "milk"],
    otherIngredients: ["butter or oil", "broth cubes", "salt", "black pepper"],
    instructions: [
      "Peel the potatoes and cube them into small, even pieces. Dice the onion fine.",
      "In a pot, sauté the onions in butter or oil until translucent.",
      "Add the potato cubes and enough hot water containing a broth cube to barely submerge the potatoes.",
      "Boil until the potatoes are completely tender (about 15 minutes). Drastically reduce the heat to low.",
      "Add milk and mash the potatoes directly in the pot, stirring to form a thick, comforting soup-stew.",
      "Season with plenty of black pepper and serve with toasted bread."
    ],
    tips: "Add any canned vegetables (carrots, corn, or peas) during the final 5 minutes of simmering for extra color and nutrition."
  },
  {
    id: "r3",
    title: "Sweet Apple Cinnamon Oatmeal Bake",
    prepTime: "10 mins",
    cookTime: "30 mins",
    difficulty: "Medium",
    matchIngredients: ["apples", "oats", "milk"],
    otherIngredients: ["cinnamon", "sugar or honey", "egg (optional)", "baking powder"],
    instructions: [
      "Preheat your oven or toaster oven to 375°F (190°C). Grease a small baking dish.",
      "Core and chop the apples into bite-size bits. Toss with cinnamon and a tablespoon of sugar.",
      "In a mixing bowl, combine 2 cups of oats, 1 teaspoon of baking powder, and pinch of salt.",
      "Stir in milk, oats, and egg (if using) together with the spiced apple chunks until well incorporated.",
      "Pour the mixture into your baking dish and smooth the top. Bake for 25 to 30 minutes until golden brown and firm.",
      "Serve warm. Excellent as a nutritious make-ahead breakfast for kids!"
    ],
    tips: "You can substitute apples with canned peaches, pears, or berries if fresh apples are unavailable."
  },
  {
    id: "r4",
    title: "Golden Rice & Corn Chowder Casserole",
    prepTime: "15 mins",
    cookTime: "20 mins",
    difficulty: "Easy",
    matchIngredients: ["rice", "canned corn", "onion", "milk"],
    otherIngredients: ["flour", "oil", "garlic powder", "herb seasoning"],
    instructions: [
      "Cook dried rice according to package directions or use leftover cooked rice.",
      "In a medium pan, cook the diced onion in oil. Stir in 1 tablespoon of flour and cook for 1 minute to make a thickener.",
      "Slowly whisk in milk, keeping the heat medium, until it bubbles and thickens into a golden sauce.",
      "Drain and stir in the canned corn. Season with garlic powder, salt, and pepper.",
      "Fold the cooked rice into the corn sauce. Transfer into a baking dish and bake for 15 minutes to bubble, or simply cook covered in your skillet on very low heat until steaming."
    ],
    tips: "Top with a sprinkle of shredded cheese or crushed crackers before baking for an addictive crunchy top layer!"
  }
];
