CREATE TYPE "public"."body_type" AS ENUM('Saloon', 'Coupe', 'SUV', 'Estate', 'Convertible', 'Hatchback', 'Sports Car');--> statement-breakpoint
CREATE TYPE "public"."drivetrain" AS ENUM('FWD', 'RWD', 'AWD', '4WD');--> statement-breakpoint
CREATE TYPE "public"."enquiry_type" AS ENUM('general', 'vehicle', 'finance', 'test_drive', 'part_exchange', 'sell_my_car', 'sourcing');--> statement-breakpoint
CREATE TYPE "public"."fuel_type" AS ENUM('Petrol', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid');--> statement-breakpoint
CREATE TYPE "public"."transmission" AS ENUM('Manual', 'Automatic', 'Semi-Automatic');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'staff');--> statement-breakpoint
CREATE TYPE "public"."vehicle_status" AS ENUM('available', 'reserved', 'sold');--> statement-breakpoint
CREATE TABLE "dealership_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"company_number" varchar(50),
	"opening_hours" text,
	"terms_url" varchar(255),
	"privacy_url" varchar(255),
	"instagram_url" varchar(255),
	"facebook_url" varchar(255),
	"youtube_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"message" text NOT NULL,
	"enquiry_type" "enquiry_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"handled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"hero_title" varchar(255),
	"hero_subtitle" varchar(255),
	"published" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "service_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'staff' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicle_features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"feature_name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" varchar(255),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"variant" varchar(100),
	"year" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"finance_monthly" numeric(10, 2),
	"mileage" integer NOT NULL,
	"transmission" "transmission" NOT NULL,
	"fuel_type" "fuel_type" NOT NULL,
	"body_type" "body_type" NOT NULL,
	"drivetrain" "drivetrain",
	"colour" varchar(50),
	"engine_size" varchar(50),
	"doors" integer,
	"seats" integer,
	"registration" varchar(20),
	"previous_owners" integer,
	"description" text,
	"status" "vehicle_status" DEFAULT 'available' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_features" ADD CONSTRAINT "vehicle_features_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_images" ADD CONSTRAINT "vehicle_images_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;