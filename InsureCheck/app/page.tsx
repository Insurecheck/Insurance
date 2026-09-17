"use client";

import { useEffect, useRef, useState } from "react";

type QuoteType = "both" | "comprehensive" | "thirdParty";

type Step =
  | "start"
  | "vehicle"
  | "driver"
  | "contact"
  | "quotes"
  | "review"
  | "documents"
  | "payment"
  | "success";

type DocStatus =
  | "empty"
  | "uploading"
  | "validating"
  | "validated"
  | "error";

interface DocumentSlot {
  fileName: string | null;
  status: DocStatus;
  detectedLabel: string;
  detectedValue: string;
  errorMessage: string;
}

type DocumentKey =
  | "registrationCard"
  | "drivingLicense"
  | "emiratesId"
  | "passingCertificate";

interface Quote {
  id: number;
  insurer: string;
  type: "Comprehensive" | "Third Party";
  premium: number;
  excess: number;
  rating: string;
  benefits: string[];
}

/*
|--------------------------------------------------------------------------
| VEHICLE CATALOGUE
|--------------------------------------------------------------------------
| This is temporary development data.
|
| In production, your ASP.NET backend should provide:
|
| GET /api/vehicles/brands
| GET /api/vehicles/models?brand=Toyota
| GET /api/vehicles/years?brand=Toyota&model=Camry
|
| This allows the backend to remain the single source of truth.
|--------------------------------------------------------------------------
*/

const vehicleCatalog: Record<string, string[]> = {
  Toyota: [
    "Corolla",
    "Camry",
    "Yaris",
    "Yaris Sedan",
    "Land Cruiser",
    "Land Cruiser Prado",
    "RAV4",
    "Fortuner",
    "Hilux",
    "Highlander",
    "Crown",
    "Avalon",
    "Supra",
    "GR86",
    "Rush",
    "Raize",
    "Urban Cruiser",
    "Innova",
    "Veloz",
    "Sequoia",
    "Tundra",
  ],

  Nissan: [
    "Sunny",
    "Altima",
    "Maxima",
    "Sentra",
    "Kicks",
    "X-Trail",
    "Pathfinder",
    "Patrol",
    "Patrol Super Safari",
    "Qashqai",
    "Murano",
    "Navara",
    "X-Terra",
    "Z",
  ],

  Lexus: [
    "ES",
    "IS",
    "LS",
    "LC",
    "RC",
    "UX",
    "NX",
    "RX",
    "GX",
    "LX",
  ],

  Mercedes: [
    "A-Class",
    "B-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "CLA",
    "CLS",
    "GLA",
    "GLB",
    "GLC",
    "GLE",
    "GLS",
    "G-Class",
    "AMG GT",
    "EQB",
    "EQC",
    "EQE",
    "EQS",
  ],

  BMW: [
    "1 Series",
    "2 Series",
    "3 Series",
    "4 Series",
    "5 Series",
    "7 Series",
    "8 Series",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
    "XM",
    "i4",
    "i5",
    "i7",
    "iX",
  ],

  Audi: [
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "Q2",
    "Q3",
    "Q5",
    "Q7",
    "Q8",
    "Q4 e-tron",
    "Q8 e-tron",
    "RS3",
    "RS5",
    "RS6",
    "RS7",
  ],

  Porsche: [
    "718 Cayman",
    "718 Boxster",
    "911",
    "Taycan",
    "Panamera",
    "Macan",
    "Cayenne",
  ],

  "Land Rover": [
    "Range Rover",
    "Range Rover Sport",
    "Range Rover Velar",
    "Range Rover Evoque",
    "Defender",
    "Discovery",
    "Discovery Sport",
  ],

  Mitsubishi: [
    "Attrage",
    "ASX",
    "Eclipse Cross",
    "Outlander",
    "Pajero",
    "Montero Sport",
    "L200",
  ],

  Honda: [
    "Accord",
    "Civic",
    "City",
    "CR-V",
    "HR-V",
    "Pilot",
    "Odyssey",
    "ZR-V",
  ],

  Hyundai: [
    "Accent",
    "Elantra",
    "Sonata",
    "Kona",
    "Creta",
    "Tucson",
    "Santa Fe",
    "Palisade",
    "Staria",
    "Venue",
    "Ioniq 5",
    "Ioniq 6",
  ],

  Kia: [
    "Picanto",
    "Rio",
    "Cerato",
    "K5",
    "K8",
    "Seltos",
    "Sportage",
    "Sorento",
    "Telluride",
    "Carnival",
    "EV6",
    "EV9",
  ],

  Ford: [
    "Territory",
    "Escape",
    "Edge",
    "Explorer",
    "Expedition",
    "Everest",
    "Bronco",
    "Mustang",
    "Ranger",
    "F-150",
  ],

  Chevrolet: [
    "Spark",
    "Malibu",
    "Cruze",
    "Equinox",
    "Traverse",
    "Tahoe",
    "Suburban",
    "Blazer",
    "Trax",
    "Silverado",
    "Camaro",
    "Corvette",
  ],

  GMC: [
    "Terrain",
    "Acadia",
    "Yukon",
    "Yukon XL",
    "Sierra",
    "Canyon",
  ],

  Jeep: [
    "Renegade",
    "Compass",
    "Cherokee",
    "Grand Cherokee",
    "Wrangler",
    "Gladiator",
  ],

  Mazda: [
    "Mazda 2",
    "Mazda 3",
    "Mazda 6",
    "CX-3",
    "CX-30",
    "CX-5",
    "CX-60",
    "CX-90",
  ],

  Volkswagen: [
    "Golf",
    "Passat",
    "Jetta",
    "Tiguan",
    "Touareg",
    "Teramont",
    "T-Roc",
    "ID.4",
    "ID.6",
  ],

  Volvo: [
    "S60",
    "S90",
    "XC40",
    "XC60",
    "XC90",
    "EX30",
    "EX90",
  ],

  Infiniti: [
    "Q30",
    "Q50",
    "Q60",
    "QX50",
    "QX55",
    "QX60",
    "QX80",
  ],

  Cadillac: [
    "CT4",
    "CT5",
    "XT4",
    "XT5",
    "XT6",
    "Escalade",
    "Lyriq",
  ],

  Genesis: [
    "G70",
    "G80",
    "G90",
    "GV60",
    "GV70",
    "GV80",
  ],

  Renault: [
    "Clio",
    "Megane",
    "Duster",
    "Koleos",
    "Arkana",
    "Austral",
  ],

  Peugeot: [
    "208",
    "308",
    "408",
    "508",
    "2008",
    "3008",
    "5008",
  ],

  Dodge: [
    "Charger",
    "Challenger",
    "Durango",
    "Hornet",
  ],

  Tesla: [
    "Model 3",
    "Model Y",
    "Model S",
    "Model X",
    "Cybertruck",
  ],

  BYD: [
    "Atto 3",
    "Seal",
    "Han",
    "Tang",
    "Song Plus",
    "Dolphin",
  ],

  MG: [
    "MG 3",
    "MG 5",
    "MG 6",
    "MG GT",
    "ZS",
    "HS",
    "RX5",
    "RX8",
    "Marvel R",
  ],

  Geely: [
    "Emgrand",
    "Coolray",
    "Monjaro",
    "Okavango",
    "Geometry C",
  ],

  Chery: [
    "Arrizo 5",
    "Arrizo 8",
    "Tiggo 4 Pro",
    "Tiggo 7 Pro",
    "Tiggo 8 Pro",
    "Tiggo 8 Pro Max",
  ],

  GAC: [
    "GS3",
    "GS4",
    "GS5",
    "GS8",
    "Emkoo",
    "Empow",
  ],

  Jetour: [
    "X50",
    "X70",
    "X70 Plus",
    "X90",
    "X90 Plus",
    "Dashing",
  ],

  Haval: [
    "H2",
    "H6",
    "H9",
    "Jolion",
    "Dargo",
  ],

  Changan: [
    "Alsvin",
    "CS35 Plus",
    "CS55 Plus",
    "CS75 Plus",
    "CS85",
    "CS95",
    "UNI-T",
    "UNI-K",
  ],

  Hongqi: [
    "H5",
    "H6",
    "H9",
    "HS5",
    "HS7",
    "E-HS9",
  ],

  Maserati: [
    "Ghibli",
    "Quattroporte",
    "Levante",
    "Grecale",
    "GranTurismo",
    "MC20",
  ],

  Ferrari: [
    "Roma",
    "296 GTB",
    "296 GTS",
    "SF90 Stradale",
    "Purosangue",
    "812 Superfast",
  ],

  Lamborghini: [
    "Huracan",
    "Urus",
    "Revuelto",
    "Aventador",
  ],

  Bentley: [
    "Bentayga",
    "Continental GT",
    "Flying Spur",
  ],

  "Rolls-Royce": [
    "Ghost",
    "Phantom",
    "Cullinan",
    "Spectre",
    "Dawn",
    "Wraith",
  ],

  "Aston Martin": [
    "Vantage",
    "DB12",
    "DBX",
    "Vanquish",
  ],

  McLaren: [
    "Artura",
    "750S",
    "720S",
    "GT",
  ],

  Lucid: [
    "Air",
    "Gravity",
  ],

  Polestar: [
    "Polestar 2",
    "Polestar 3",
    "Polestar 4",
  ],
};

/*
|--------------------------------------------------------------------------
| VEHICLE TRIM CATALOGUE
|--------------------------------------------------------------------------
| This is temporary development data, same as VEHICLE CATALOGUE above.
|
| In production, your ASP.NET backend should provide:
|
| GET /api/vehicles/trims?brand=Toyota&model=Land+Cruiser&year=2024
|
| Trim availability genuinely depends on brand + model + year (a 2016
| Land Cruiser and a 2024 Land Cruiser don't share trims), so the real
| endpoint should be queried with all three params once they're known.
| Keyed here by "Brand|Model" as a stand-in; falls back to
| defaultTrims for any brand/model not explicitly listed.
|--------------------------------------------------------------------------
*/

const vehicleTrimCatalog: Record<string, string[]> = {
  "Toyota|Land Cruiser": [
    "GX",
    "GXR",
    "VXR",
    "GX-R",
    "VX-R",
  ],
  "Toyota|Land Cruiser Prado": [
    "TXL",
    "TX-L",
    "VXR",
    "VX-R",
  ],
  "Toyota|Camry": [
    "GL",
    "SE",
    "Limited",
    "Grande",
  ],
  "Toyota|Corolla": [
    "GLi",
    "XLi",
    "SE",
  ],
  "Nissan|Patrol": [
    "XE",
    "SE",
    "SE Platinum",
    "Nismo",
  ],
  "Lexus|LX": [
    "LX 500d",
    "LX 600",
    "F Sport",
  ],
  "Mercedes|C-Class": [
    "C200",
    "C300",
    "AMG Line",
  ],
  "Mercedes|G-Class": [
    "G500",
    "G63 AMG",
  ],
  "BMW|3 Series": [
    "318i",
    "320i",
    "330i",
    "M340i",
  ],
  "BMW|5 Series": [
    "520i",
    "530i",
    "540i",
    "M5",
  ],
};

/*
|--------------------------------------------------------------------------
| EMAIL VALIDATION
|--------------------------------------------------------------------------
| A pragmatic RFC 5322-style check: local@domain.tld, no spaces, single "@",
| and at least one "." after the "@" with a 2+ character TLD.
|--------------------------------------------------------------------------
*/

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isValidEmail = (email: string) =>
  EMAIL_REGEX.test(email.trim());

const defaultTrims = [
  "Base",
  "Mid Option",
  "Full Option",
  "GCC Specs",
];

const nationalities: string[] = [
  "UAE",
  "Afghan",
  "Algerian",
  "American",
  "Australian",
  "Bahraini",
  "Bangladeshi",
  "British",
  "Canadian",
  "Chinese",
  "Egyptian",
  "Emirati",
  "Ethiopian",
  "Filipino",
  "French",
  "German",
  "Ghanaian",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Italian",
  "Jordanian",
  "Kenyan",
  "Kuwaiti",
  "Lebanese",
  "Malaysian",
  "Moroccan",
  "Nepalese",
  "Nigerian",
  "Omani",
  "Pakistani",
  "Palestinian",
  "Qatari",
  "Russian",
  "Saudi Arabian",
  "South African",
  "Sri Lankan",
  "Sudanese",
  "Syrian",
  "Tunisian",
  "Turkish",
  "Yemeni",
  "Other",
];


/*
|--------------------------------------------------------------------------
| MOCK QUOTES
|--------------------------------------------------------------------------
| Replace these with the response from your ASP.NET quotation API.
|--------------------------------------------------------------------------
*/

const mockQuotes: Quote[] = [
  {
    id: 1,
    insurer: "Insurer A",
    type: "Comprehensive",
    premium: 2850,
    excess: 750,
    rating: "Excellent",
    benefits: [
      "Agency repair",
      "Roadside assistance",
      "Personal accident cover",
      "Natural disaster cover",
    ],
  },

  {
    id: 2,
    insurer: "Insurer B",
    type: "Comprehensive",
    premium: 3120,
    excess: 500,
    rating: "Excellent",
    benefits: [
      "Agency repair",
      "24/7 roadside assistance",
      "Personal accident cover",
      "Off-road cover",
    ],
  },

  {
    id: 3,
    insurer: "Insurer C",
    type: "Third Party",
    premium: 890,
    excess: 0,
    rating: "Good",
    benefits: [
      "Third-party liability",
      "Roadside assistance",
      "Legal liability cover",
    ],
  },

  {
    id: 4,
    insurer: "Insurer D",
    type: "Comprehensive",
    premium: 3380,
    excess: 1000,
    rating: "Very Good",
    benefits: [
      "Agency repair",
      "GCC coverage",
      "Roadside assistance",
      "Personal accident cover",
    ],
  },
];


/*
|--------------------------------------------------------------------------
| DOCUMENT UPLOAD CONFIG
|--------------------------------------------------------------------------
| Defines the four documents collected before payment. In production,
| each upload should POST to your ASP.NET document/OCR endpoint, e.g.
|
| POST /api/documents/upload
| FormData: { type: "drivingLicense", file }
|
| Example response:
| {
|   "status": "validated",
|   "detectedLabel": "Licence No.",
|   "detectedValue": "DL-48213097"
| }
|--------------------------------------------------------------------------
*/

const documentConfig: Record<
  DocumentKey,
  {
    title: string;
    description: string;
    icon: string;
    detectedLabel: string;
    accept: string;
  }
> = {
  registrationCard: {
    title: "Registration Card (Mulkiya)",
    description: "Front and back of your vehicle registration card.",
    icon: "📄",
    detectedLabel: "Plate No.",
    accept: "image/*,.pdf",
  },
  drivingLicense: {
    title: "Driving License",
    description: "A valid UAE driving license for the main driver.",
    icon: "🪪",
    detectedLabel: "Licence No.",
    accept: "image/*,.pdf",
  },
  emiratesId: {
    title: "Emirates ID",
    description: "Front and back of the policyholder's Emirates ID.",
    icon: "🆔",
    detectedLabel: "Emirates ID No.",
    accept: "image/*,.pdf",
  },
  passingCertificate: {
    title: "Passing Certificate",
    description: "Vehicle test / passing certificate, if applicable.",
    icon: "✅",
    detectedLabel: "Certificate No.",
    accept: "image/*,.pdf",
  },
};

const emptyDocumentSlot: DocumentSlot = {
  fileName: null,
  status: "empty",
  detectedLabel: "",
  detectedValue: "",
  errorMessage: "",
};


export default function Home() {

  const [step, setStep] = useState<Step>("start");

  const quoteCardRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    quoteCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  }, [step]);


  const [quoteType, setQuoteType] =
    useState<QuoteType>("both");

  const [vehicleMethod, setVehicleMethod] =
    useState<"vin" | "manual" | null>(null);

  const [vin, setVin] = useState("");

  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    trim: "",
    value: "",
    registration: "",
  });

  const [driver, setDriver] = useState({
    dob: "",
    nationality: "",
    experience: "",
    claims: "",
    emirate: "",
  });

  const [contact, setContact] = useState({
    name: "",
    mobile: "",
    email: "",
    consent: false,
  });

  const [selectedQuote, setSelectedQuote] =
    useState<Quote | null>(null);



  const [documents, setDocuments] = useState<
    Record<DocumentKey, DocumentSlot>
  >({
    registrationCard: { ...emptyDocumentSlot },
    drivingLicense: { ...emptyDocumentSlot },
    emiratesId: { ...emptyDocumentSlot },
    passingCertificate: { ...emptyDocumentSlot },
  });

  const [vinLoading, setVinLoading] =
    useState(false);

  const [validationMessage, setValidationMessage] =
    useState("");

  const [mobileMenu, setMobileMenu] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | DEPENDENT VEHICLE DATA
  |--------------------------------------------------------------------------
  */

  const availableModels = vehicle.make
    ? vehicleCatalog[vehicle.make] || []
    : [];

  const modelYears = Array.from(
    { length: 15 },
    (_, index) =>
      String(new Date().getFullYear() - index)
  );

  const availableTrims =
    vehicle.make && vehicle.model && vehicle.year
      ? vehicleTrimCatalog[
          `${vehicle.make}|${vehicle.model}`
        ] || defaultTrims
      : [];


  /*
  |--------------------------------------------------------------------------
  | FILTER QUOTES
  |--------------------------------------------------------------------------
  */

  const filteredQuotes =
    quoteType === "both"
      ? mockQuotes
      : mockQuotes.filter((quote) =>
          quoteType === "comprehensive"
            ? quote.type === "Comprehensive"
            : quote.type === "Third Party"
        );


  /*
  |--------------------------------------------------------------------------
  | VIN LOOKUP
  |--------------------------------------------------------------------------
  */

  const handleVinLookup = async () => {

    if (!vin.trim()) {

      setValidationMessage(
        "Please enter your VIN or chassis number."
      );

      return;
    }

    setValidationMessage("");
    setVinLoading(true);


    /*
    ----------------------------------------------------------------------
    ASP.NET BACKEND INTEGRATION

    Replace this simulated lookup with:

    POST /api/vehicle/lookup

    Example request:

    {
      "vin": "XXXXXXXXXXXXXXXXX"
    }

    Example response:

    {
      "make": "Toyota",
      "model": "Land Cruiser",
      "year": "2024",
      "trim": "GXR",
      "vehicleValue": 245000,
      "registration": "Dubai"
    }

    ----------------------------------------------------------------------
    */


    setTimeout(() => {

      setVehicle({
        make: "Toyota",
        model: "Land Cruiser",
        year: "2024",
        trim: "GXR",
        value: "245000",
        registration: "Dubai",
      });

      setVinLoading(false);
      setStep("vehicle");

    }, 1000);
  };


  /*
  |--------------------------------------------------------------------------
  | DOCUMENT UPLOAD + VALIDATION
  |--------------------------------------------------------------------------
  | Handles a single document upload. Simulates:
  |   1. Uploading the file
  |   2. Running OCR / validation on the backend
  |   3. Returning the detected value (e.g. licence number)
  |--------------------------------------------------------------------------
  */

  const handleDocumentUpload = (
    key: DocumentKey,
    file: File | null
  ) => {

    if (!file) return;

    setDocuments((previous) => ({
      ...previous,
      [key]: {
        ...previous[key],
        fileName: file.name,
        status: "uploading",
        errorMessage: "",
      },
    }));


    /*
    ----------------------------------------------------------------------
    ASP.NET BACKEND INTEGRATION

    Replace this simulated upload + OCR check with:

    POST /api/documents/upload
    Content-Type: multipart/form-data

    FormData:
      type: "registrationCard" | "drivingLicense" |
            "emiratesId" | "passingCertificate"
      file: <binary>

    Example response:

    {
      "status": "validated",
      "detectedLabel": "Licence No.",
      "detectedValue": "DL-48213097"
    }

    If the document cannot be read/validated, return:

    {
      "status": "error",
      "message": "Document unclear, please re-upload."
    }
    ----------------------------------------------------------------------
    */

    setTimeout(() => {

      setDocuments((previous) => ({
        ...previous,
        [key]: {
          ...previous[key],
          status: "validating",
        },
      }));

      setTimeout(() => {

        const mockDetectedValues: Record<DocumentKey, string> = {
          registrationCard: "DXB-A-12345",
          drivingLicense: "DL-48213097",
          emiratesId: "784-1990-1234567-1",
          passingCertificate: "PC-2026-009831",
        };

        setDocuments((previous) => ({
          ...previous,
          [key]: {
            ...previous[key],
            status: "validated",
            detectedLabel: documentConfig[key].detectedLabel,
            detectedValue: mockDetectedValues[key],
          },
        }));

      }, 1200);

    }, 700);
  };

  const removeDocument = (key: DocumentKey) => {

    setDocuments((previous) => ({
      ...previous,
      [key]: { ...emptyDocumentSlot },
    }));
  };

  const allDocumentsValidated = (
    Object.keys(documentConfig) as DocumentKey[]
  ).every((key) => documents[key].status === "validated");


  /*
  |--------------------------------------------------------------------------
  | VALIDATION
  |--------------------------------------------------------------------------
  */

  const validateVehicle = () => {

    if (
      !vehicle.make ||
      !vehicle.model ||
      !vehicle.year ||
      !vehicle.value ||
      !vehicle.registration
    ) {

      setValidationMessage(
        "Please complete all required vehicle details."
      );

      return false;
    }

    setValidationMessage("");

    return true;
  };


  const validateDriver = () => {

    if (
      !driver.dob ||
      !driver.nationality ||
      !driver.experience ||
      !driver.claims ||
      !driver.emirate
    ) {

      setValidationMessage(
        "Please complete all required driver details."
      );

      return false;
    }

    setValidationMessage("");

    return true;
  };


  const validateContact = () => {

    if (
      !contact.name ||
      !contact.mobile ||
      !contact.email
    ) {

      setValidationMessage(
        "Please complete your contact information."
      );

      return false;
    }
     if (!isValidEmail(contact.email)) {

      setValidationMessage(
        "Please enter a valid email address."
      );

      return false;
    }

    if (!contact.consent) {

      setValidationMessage(
        "Please accept the privacy notice and terms to continue."
      );

      return false;
    }

    setValidationMessage("");

    return true;
  };


  /*
  |--------------------------------------------------------------------------
  | QUOTE REQUEST
  |--------------------------------------------------------------------------
  */

  const requestQuotes = async () => {

    /*
    ----------------------------------------------------------------------
    ASP.NET BACKEND

    POST /api/quotes

    Payload:

    {
      vehicle: {
        make,
        model,
        year,
        trim,
        value,
        registration
      },

      driver: {
        dob,
        nationality,
        experience,
        claims,
        emirate
      },

      contact: {
        name,
        mobile,
        email
      },

      quoteType
    }

    ASP.NET then communicates with the authorized insurer APIs.

    ----------------------------------------------------------------------
    */

    setStep("quotes");
  };


  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  const resetQuote = () => {

    setStep("start");

    setVehicleMethod(null);

    setVin("");

    setSelectedQuote(null);

    setValidationMessage("");

    setDocuments({
      registrationCard: { ...emptyDocumentSlot },
      drivingLicense: { ...emptyDocumentSlot },
      emiratesId: { ...emptyDocumentSlot },
      passingCertificate: { ...emptyDocumentSlot },
    });

  };


  return (

    <main className="min-h-screen bg-[#F4F8FC] text-[#1C2333]">


      {/* ================================================================
          HEADER
          SAME STYLE AS ABOUT US + CONTACT US
      ================================================================= */}

    <header className="sticky top-0 z-50 border-b border-[#E1E8F2] bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">


          {/* LOGO */}

          <a
            href="/"
            className="flex shrink-0 items-center gap-3 sm:gap-4"
          >

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/checkinsure-wordmark.png"
              alt="insurecheck.ae"
              className="h-[22px] w-auto shrink-0 sm:h-[20px] lg:h-[22px]"
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-full.png"
              alt="checkinsure.ae"
              className="hidden h-[58px] w-auto shrink-0 object-contain sm:block lg:h-[64px]"
            />

          </a>


          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-7 lg:flex">

            <a
              href="/"
              className="text-sm font-semibold text-[#0B5FC4]"
            >
              Car Insurance
            </a>


            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#6B6B6B] transition hover:text-[#0B5FC4]"
            >
              How It Works
            </a>


            <a
              href="#why-us"
              className="text-sm font-medium text-[#6B6B6B] transition hover:text-[#0B5FC4]"
            >
              Why Us
            </a>


            <a
              href="#faq"
              className="text-sm font-medium text-[#6B6B6B] transition hover:text-[#0B5FC4]"
            >
              FAQ
            </a>


            <a
              href="/about-us"
              className="text-sm font-medium text-[#6B6B6B] transition hover:text-[#0B5FC4]"
            >
              About Us
            </a>


            <a
              href="/contact-us"
              className="text-sm font-medium text-[#6B6B6B] transition hover:text-[#0B5FC4]"
            >
              Contact
            </a>


            <button
              className="text-sm font-medium text-[#6B6B6B] transition hover:text-[#0B5FC4]"
            >
              العربية
            </button>


            <button
              onClick={() => {

                

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

              }}
              className="rounded-xl bg-[#0B5FC4] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#084B9E]"
            >
              Get a Quote
            </button>

          </nav>


          {/* MOBILE */}

          <div className="flex items-center gap-3 lg:hidden">

            <button
              onClick={() => {

                

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

              }}
              className="rounded-lg bg-[#0B5FC4] px-4 py-2 text-sm font-semibold text-white"
            >
              Get Quote
            </button>


            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="rounded-lg border border-[#E1E8F2] p-2 text-[#0F1B33]"
            >

              {mobileMenu ? "✕" : "☰"}

            </button>

          </div>

        </div>


        {/* MOBILE MENU */}

        {mobileMenu && (

          <div className="border-t border-[#E1E8F2] bg-white px-6 py-5 lg:hidden">

            <nav className="flex flex-col gap-4">

              <a
                href="/"
                onClick={() => setMobileMenu(false)}
                className="font-semibold text-[#0B5FC4]"
              >
                Car Insurance
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-[#0F1B33]"
              >
                How It Works
              </a>

              <a
                href="#why-us"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-[#0F1B33]"
              >
                Why Us
              </a>

              <a
                href="#faq"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-[#0F1B33]"
              >
                FAQ
              </a>

              <a
                href="/about-us"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-[#0F1B33]"
              >
                About Us
              </a>

              <a
                href="/contact-us"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-[#0F1B33]"
              >
                Contact
              </a>

              <button
                className="text-left font-medium text-[#0F1B33]"
              >
                العربية
              </button>

            </nav>

          </div>

        )}

      </header>



      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative overflow-hidden border-b border-[#E1E8F2] bg-gradient-to-b from-[#F4FBF7] via-[#F4F8FC] to-[#E9F7EE]">

        {/* soft color washes */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#DCEBFC] opacity-40 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#D3F1DD] opacity-60 blur-3xl" />

        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#DFF6E6] opacity-50 blur-3xl" />

        {/* Dubai skyline silhouette */}
        <svg
          aria-hidden="true"
          viewBox="0 0 420 180"
          className="pointer-events-none absolute bottom-0 left-0 h-[140px] w-[320px] text-[#1F7A43] opacity-[0.10] sm:h-[170px] sm:w-[380px]"
          fill="currentColor"
        >
          <rect x="0" y="120" width="26" height="60" />
          <rect x="30" y="95" width="20" height="85" />
          <rect x="54" y="130" width="24" height="50" />
          <rect x="82" y="70" width="16" height="110" />
          <polygon points="98,70 106,40 114,70" />
          <rect x="118" y="105" width="22" height="75" />
          <rect x="144" y="85" width="18" height="95" />
          <rect x="166" y="115" width="26" height="65" />
          <path d="M196 180V60c0-6 3-11 8-15l6 10c4 4 6 9 6 15v110z" />
          <rect x="222" y="98" width="20" height="82" />
          <rect x="246" y="128" width="24" height="52" />
          <rect x="274" y="80" width="18" height="100" />
          <rect x="296" y="140" width="22" height="40" />
          <rect x="322" y="100" width="16" height="80" />
          <rect x="342" y="150" width="30" height="30" />
        </svg>

        {/* car silhouette */}
        <svg
          aria-hidden="true"
          viewBox="0 0 520 180"
          className="pointer-events-none absolute bottom-[-18px] right-0 h-[130px] w-[300px] text-[#1F7A43] opacity-[0.14] sm:h-[160px] sm:w-[380px] lg:right-6"
          fill="currentColor"
        >
          <path d="M40 120c0-10 8-18 18-20l40-8 34-38c8-9 20-14 32-14h100c14 0 27 6 36 16l36 40 46 10c12 3 20 13 20 26v18c0 8-6 14-14 14h-24a44 44 0 0 0-88 0H166a44 44 0 0 0-88 0H54c-8 0-14-6-14-14z" />
          <circle cx="122" cy="146" r="26" className="text-white" fill="#F4FBF7" />
          <circle cx="122" cy="146" r="14" />
          <circle cx="358" cy="146" r="26" fill="#F4FBF7" />
          <circle cx="358" cy="146" r="14" />
        </svg>


        <div
          className={`relative mx-auto px-6 py-16 transition-[max-width] duration-300 lg:px-8 lg:py-24 ${
            step === "start" ? "max-w-7xl" : "max-w-[1400px]"
          }`}
        >

          <div
            className={`grid items-center gap-14 ${
              step === "start"
                ? "lg:grid-cols-[1fr_520px]"
                : "lg:grid-cols-1"
            }`}
          >


            {/* HERO LEFT */}

            <div className={step === "start" ? "" : "hidden"}>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#CFEEDA] bg-white px-4 py-2 text-sm font-semibold text-[#1F7A43]">

                <span className="h-2 w-2 rounded-full bg-[#1F7A43]" />

                Car insurance for UAE drivers

              </div>


              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0F1B33] sm:text-5xl lg:text-6xl">

                Compare car insurance

                <span className="block text-[#0B5FC4]">
                  made simple.
                </span>

              </h1>


              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B6B6B]">

                Compare eligible car insurance options from multiple
                providers, understand your coverage and choose the policy
                that works for you.

              </p>


              {/* TRUST */}

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[#6B6B6B]">

                <div className="flex items-center gap-2">

                  <span className="font-bold text-[#28734A]">
                    ✓
                  </span>

                  UAE focused

                </div>


                <div className="flex items-center gap-2">

                  <span className="font-bold text-[#28734A]">
                    ✓
                  </span>

                  Compare options

                </div>


                <div className="flex items-center gap-2">

                  <span className="font-bold text-[#28734A]">
                    ✓
                  </span>

                  Secure process

                </div>

              </div>


              {/* PROCESS */}

              <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">

                {[
                  ["01", "Tell us about your car"],
                  ["02", "Compare your options"],
                  ["03", "Choose your policy"],
                ].map(([number, text]) => (

                  <div key={number}>

                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E1F5E7] font-bold text-[#1F7A43]">
                      {number}
                    </div>

                    <p className="text-sm font-semibold text-[#0F1B33]">
                      {text}
                    </p>

                  </div>

                ))}

              </div>

            </div>


            {/* ==========================================================
                QUOTE CARD
            ========================================================== */}

            <div
              ref={quoteCardRef}
              className={`mx-auto w-full scroll-mt-28 rounded-3xl border border-[#E1E8F2] bg-white p-6 shadow-[0_25px_70px_rgba(32,33,36,0.10)] transition-[max-width] duration-300 sm:p-8 ${
                step === "start"
                  ? "max-w-none"
                  : step === "quotes"
                  ? "max-w-6xl sm:p-10"
                  : "max-w-2xl sm:p-10"
              }`}
            >


              {/* START */}

              {step === "start" && (

                <div>

                  <div className="mb-7">

                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#1F7A43]">
                      Get started
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#0F1B33]">
                      Get your car insurance quote
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                      Start with your vehicle details. It only takes a few
                      minutes.
                    </p>

                  </div>


                  {/* COVER TYPE */}

                  <div className="mb-6">

                    <label className="mb-3 block text-sm font-semibold text-[#0F1B33]">
                      What type of cover are you looking for?
                    </label>


                    <div className="grid grid-cols-3 gap-2">

                      {[
                        ["both", "Compare Both"],
                        ["comprehensive", "Comprehensive"],
                        ["thirdParty", "Third Party"],
                      ].map(([value, label]) => (

                        <button
                          key={value}
                          onClick={() =>
                            setQuoteType(
                              value as QuoteType
                            )
                          }
                          className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${
                            quoteType === value
                              ? "border-[#0B5FC4] bg-[#DCEBFC] text-[#0B5FC4]"
                              : "border-[#E1E8F2] text-[#6B6B6B] hover:border-[#0B5FC4]"
                          }`}
                        >
                          {label}
                        </button>

                      ))}

                    </div>

                  </div>


                  {/* VEHICLE METHOD */}

                  <div>

                    <label className="mb-3 block text-sm font-semibold text-[#0F1B33]">
                      How would you like to enter your vehicle?
                    </label>


                    {/* VIN */}

                    <button
                      onClick={() =>
                        setVehicleMethod("vin")
                      }
                      className={`mb-3 w-full rounded-2xl border p-4 text-left transition ${
                        vehicleMethod === "vin"
                          ? "border-[#0B5FC4] bg-[#DCEBFC]/50"
                          : "border-[#E1E8F2] hover:border-[#0B5FC4]"
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B5FC4] text-lg font-bold text-white">
                          #
                        </div>

                        <div>

                          <p className="font-semibold text-[#0F1B33]">
                            VIN / Chassis Number
                          </p>

                          <p className="mt-1 text-xs text-[#6B6B6B]">
                            Quickly retrieve your vehicle information
                          </p>

                        </div>

                      </div>

                    </button>


                    {/* MANUAL */}

                    <button
                      onClick={() =>
                        setVehicleMethod("manual")
                      }
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        vehicleMethod === "manual"
                          ? "border-[#0B5FC4] bg-[#DCEBFC]/50"
                          : "border-[#E1E8F2] hover:border-[#0B5FC4]"
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2F7] text-lg text-[#0B5FC4]">
                          🚗
                        </div>

                        <div>

                          <p className="font-semibold text-[#0F1B33]">
                            Enter vehicle manually
                          </p>

                          <p className="mt-1 text-xs text-[#6B6B6B]">
                            Select your make, model and year
                          </p>

                        </div>

                      </div>

                    </button>

                  </div>


                  {/* VIN INPUT */}

                  {vehicleMethod === "vin" && (

                    <div className="mt-5">

                      <label className="mb-2 block text-sm font-semibold text-[#0F1B33]">
                        VIN / Chassis Number
                      </label>

                      <input
                        value={vin}
                        onChange={(e) =>
                          setVin(e.target.value)
                        }
                        placeholder="Enter your VIN or chassis number"
                        className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none transition focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                      />


                      {validationMessage && (

                        <p className="mt-2 text-sm text-red-600">
                          {validationMessage}
                        </p>

                      )}


                      <button
                        onClick={handleVinLookup}
                        disabled={vinLoading}
                        className="mt-4 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#084B9E] disabled:opacity-60"
                      >

                        {vinLoading
                          ? "Finding your vehicle..."
                          : "Find My Vehicle"}

                      </button>

                    </div>

                  )}


                  {/* MANUAL VEHICLE */}

                  {vehicleMethod === "manual" && (

                    <div className="mt-5">


                      {/* BRAND */}

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-[#0F1B33]">
                          Car Brand
                        </label>

                        <select
                          value={vehicle.make}
                          onChange={(e) => {

                            setVehicle({
                              ...vehicle,
                              make: e.target.value,
                              model: "",
                              year: "",
                              trim: "",
                            });

                            setValidationMessage("");

                          }}
                          className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3.5 text-sm text-[#0F1B33] outline-none transition focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                        >

                          <option value="">
                            Select your car brand
                          </option>

                          {Object.keys(vehicleCatalog)
                            .sort()
                            .map((brand) => (

                              <option
                                key={brand}
                                value={brand}
                              >
                                {brand}
                              </option>

                            ))}

                        </select>

                      </div>


                      {/* MODEL */}

                      <div className="mt-4">

                        <label className="mb-2 block text-sm font-semibold text-[#0F1B33]">
                          Car Model
                        </label>

                        <select
                          value={vehicle.model}
                          disabled={!vehicle.make}
                          onChange={(e) => {

                            setVehicle({
                              ...vehicle,
                              model: e.target.value,
                              year: "",
                              trim: "",
                            });

                            setValidationMessage("");

                          }}
                          className={`w-full appearance-none rounded-xl border px-4 py-3.5 text-sm outline-none transition ${
                            vehicle.make
                              ? "border-[#E1E8F2] bg-white text-[#0F1B33] focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                              : "cursor-not-allowed border-[#E1E8F2] bg-[#EEF2F7] text-[#A0A0A0]"
                          }`}
                        >

                          <option value="">
                            {vehicle.make
                              ? "Select your car model"
                              : "Select brand first"}
                          </option>

                          {availableModels.map(
                            (model) => (

                              <option
                                key={model}
                                value={model}
                              >
                                {model}
                              </option>

                            )
                          )}

                        </select>

                      </div>


                      {/* YEAR */}

                      <div className="mt-4">

                        <label className="mb-2 block text-sm font-semibold text-[#0F1B33]">
                          Model Year
                        </label>

                        <select
                          value={vehicle.year}
                          disabled={!vehicle.model}
                          onChange={(e) => {

                            setVehicle({
                              ...vehicle,
                              year: e.target.value,
                            });

                            setValidationMessage("");

                          }}
                          className={`w-full appearance-none rounded-xl border px-4 py-3.5 text-sm outline-none transition ${
                            vehicle.model
                              ? "border-[#E1E8F2] bg-white text-[#0F1B33] focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                              : "cursor-not-allowed border-[#E1E8F2] bg-[#EEF2F7] text-[#A0A0A0]"
                          }`}
                        >

                          <option value="">
                            {vehicle.model
                              ? "Select model year"
                              : "Select model first"}
                          </option>

                          {modelYears.map(
                            (year) => (

                              <option
                                key={year}
                                value={year}
                              >
                                {year}
                              </option>

                            )
                          )}

                        </select>

                      </div>


                      {validationMessage && (

                        <p className="mt-3 text-sm text-red-600">
                          {validationMessage}
                        </p>

                      )}


                      <button
                        onClick={() => {

                          if (
                            !vehicle.make ||
                            !vehicle.model ||
                            !vehicle.year
                          ) {

                            setValidationMessage(
                              "Please select your car brand, model and model year."
                            );

                            return;
                          }

                          setValidationMessage("");
                          setStep("vehicle");

                        }}
                        className="mt-5 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#084B9E]"
                      >
                        Continue
                      </button>

                    </div>

                  )}

                </div>

              )}


              {/* ==========================================================
                  VEHICLE INFORMATION
              ========================================================== */}

              {step === "vehicle" && (

                <div>

                  <div className="mb-6">

                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#1F7A43]">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1">
                        Step 1 of 3
                      </span>

                      Vehicle information

                    </div>


                    <h2 className="text-2xl font-bold text-[#0F1B33]">
                      Tell us about your vehicle
                    </h2>


                    <p className="mt-2 text-sm text-[#6B6B6B]">
                      Confirm your vehicle details before continuing.
                    </p>

                  </div>


                  <div className="grid gap-4 sm:grid-cols-2">


                    {/* BRAND */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Make / Brand *
                      </label>

                      <select
                        value={vehicle.make}
                        onChange={(e) => {

                          setVehicle({
                            ...vehicle,
                            make: e.target.value,
                            model: "",
                            year: "",
                            trim: "",
                          });

                        }}
                        className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3 text-sm text-[#0F1B33] outline-none focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                      >

                        <option value="">
                          Select brand
                        </option>

                        {Object.keys(vehicleCatalog)
                          .sort()
                          .map((brand) => (

                            <option
                              key={brand}
                              value={brand}
                            >
                              {brand}
                            </option>

                          ))}

                      </select>

                    </div>


                    {/* MODEL */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Model *
                      </label>

                      <select
                        value={vehicle.model}
                        disabled={!vehicle.make}
                        onChange={(e) => {

                          setVehicle({
                            ...vehicle,
                            model: e.target.value,
                            year: "",
                            trim: "",
                          });

                        }}
                        className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm outline-none ${
                          vehicle.make
                            ? "border-[#E1E8F2] bg-white text-[#0F1B33] focus:border-[#0B5FC4]"
                            : "cursor-not-allowed border-[#E1E8F2] bg-[#EEF2F7] text-[#A0A0A0]"
                        }`}
                      >

                        <option value="">
                          {vehicle.make
                            ? "Select model"
                            : "Select brand first"}
                        </option>

                        {availableModels.map(
                          (model) => (

                            <option
                              key={model}
                              value={model}
                            >
                              {model}
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* YEAR */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Model Year *
                      </label>

                      <select
                        value={vehicle.year}
                        disabled={!vehicle.model}
                        onChange={(e) => {

                          setVehicle({
                            ...vehicle,
                            year: e.target.value,
                          });

                        }}
                        className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm outline-none ${
                          vehicle.model
                            ? "border-[#E1E8F2] bg-white text-[#0F1B33] focus:border-[#0B5FC4]"
                            : "cursor-not-allowed border-[#E1E8F2] bg-[#EEF2F7] text-[#A0A0A0]"
                        }`}
                      >

                        <option value="">
                          {vehicle.model
                            ? "Select model year"
                            : "Select model first"}
                        </option>

                        {modelYears.map(
                          (year) => (

                            <option
                              key={year}
                              value={year}
                            >
                              {year}
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* TRIM */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Trim / Variant <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={vehicle.trim}
                        disabled={!vehicle.year}
                        onChange={(e) =>
                          setVehicle({
                            ...vehicle,
                            trim: e.target.value,
                          })
                        }
                        className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm outline-none ${
                          vehicle.year
                            ? "border-[#E5E1DC] bg-white text-[#202124] focus:border-[#7A263A]"
                            : "cursor-not-allowed border-[#E5E1DC] bg-[#F1EFEB] text-[#A0A0A0]"
                        }`}
                      >

                        <option value="">
                          {vehicle.year
                            ? "Select trim / variant"
                            : "Select model year first"}
                        </option>

                        {availableTrims.map(
                          (trim) => (

                            <option
                              key={trim}
                              value={trim}
                            >
                              {trim}
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* VALUE */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Vehicle Value (AED) *
                      </label>

                      <input
                        type="number"
                        value={vehicle.value}
                        onChange={(e) =>
                          setVehicle({
                            ...vehicle,
                            value: e.target.value,
                          })
                        }
                        placeholder="e.g. 150000"
                        className="w-full rounded-xl border border-[#E1E8F2] bg-white px-4 py-3 text-sm outline-none focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                      />

                    </div>


                    {/* REGISTRATION */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Registration Emirate *
                      </label>

                      <select
                        value={vehicle.registration}
                        onChange={(e) =>
                          setVehicle({
                            ...vehicle,
                            registration: e.target.value,
                          })
                        }
                        className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3 text-sm outline-none focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                      >

                        <option value="">
                          Select emirate
                        </option>

                        <option value="Abu Dhabi">
                          Abu Dhabi
                        </option>

                        <option value="Ajman">
                          Ajman
                        </option>

                        <option value="Dubai">
                          Dubai
                        </option>

                        <option value="Fujairah">
                          Fujairah
                        </option>

                        <option value="Ras Al Khaimah">
                          Ras Al Khaimah
                        </option>

                        <option value="Sharjah">
                          Sharjah
                        </option>

                        <option value="Umm Al Quwain">
                          Umm Al Quwain
                        </option>

                      </select>

                    </div>

                  </div>


                  {validationMessage && (

                    <p className="mt-4 text-sm text-red-600">
                      {validationMessage}
                    </p>

                  )}


                  <button
                    onClick={() => {

                      if (validateVehicle()) {
                        setStep("driver");
                      }

                    }}
                    className="mt-6 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#084B9E]"
                  >
                    Continue to Driver Details
                  </button>

                </div>

              )}


              {/* ==========================================================
                  DRIVER
              ========================================================== */}

              {step === "driver" && (

                <div>

                  <div className="mb-6">

                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#1F7A43]">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1">
                        Step 2 of 3
                      </span>

                      Driver information

                    </div>


                    <h2 className="text-2xl font-bold text-[#0F1B33]">
                      Tell us about the driver
                    </h2>


                    <p className="mt-2 text-sm text-[#6B6B6B]">
                      Insurance providers use these details to calculate
                      eligibility and pricing.
                    </p>

                  </div>


                  <div className="space-y-4">


                    {/* DOB */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Date of Birth *
                      </label>

                      <input
                        type="date"
                        value={driver.dob}
                        onChange={(e) =>
                          setDriver({
                            ...driver,
                            dob: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3 text-sm outline-none focus:border-[#0B5FC4]"
                      />

                    </div>


                    {/* NATIONALITY */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Nationality <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={driver.nationality}
                        onChange={(e) =>
                          setDriver({
                            ...driver,
                            nationality: e.target.value,
                          })
                        }
                        className="w-full appearance-none rounded-xl border border-[#E5E1DC] bg-white px-4 py-3 text-sm outline-none focus:border-[#7A263A]"
                      >

                        <option value="">
                          Select nationality
                        </option>

                        {nationalities.map((nationality) => (

                          <option
                            key={nationality}
                            value={nationality}
                          >
                            {nationality}
                          </option>

                        ))}

                      </select>

                    </div>


                    {/* EXPERIENCE */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Driving Experience *
                      </label>

                      <select
                        value={driver.experience}
                        onChange={(e) =>
                          setDriver({
                            ...driver,
                            experience: e.target.value,
                          })
                        }
                        className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3 text-sm outline-none focus:border-[#0B5FC4]"
                      >

                        <option value="">
                          Select driving experience
                        </option>

                        <option value="Less than 1 year">
                          Less than 1 year
                        </option>

                        <option value="1-2 years">
                          1-2 years
                        </option>

                        <option value="3-5 years">
                          3-5 years
                        </option>

                        <option value="6-10 years">
                          6-10 years
                        </option>

                        <option value="More than 10 years">
                          More than 10 years
                        </option>

                      </select>

                    </div>


                    {/* CLAIMS */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Claims History *
                      </label>

                      <select
                        value={driver.claims}
                        onChange={(e) =>
                          setDriver({
                            ...driver,
                            claims: e.target.value,
                          })
                        }
                        className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3 text-sm outline-none focus:border-[#0B5FC4]"
                      >

                        <option value="">
                          Select claims history
                        </option>

                        <option value="No claims">
                          No claims
                        </option>

                        <option value="1 claim">
                          1 claim
                        </option>

                        <option value="2 claims">
                          2 claims
                        </option>

                        <option value="3 or more claims">
                          3 or more claims
                        </option>

                      </select>

                    </div>


                    {/* DRIVER EMIRATE */}

                    <div>

                      <label className="mb-2 block text-xs font-semibold text-[#6B6B6B]">
                        Driver Registration Emirate *
                      </label>

                      <select
                        value={driver.emirate}
                        onChange={(e) =>
                          setDriver({
                            ...driver,
                            emirate: e.target.value,
                          })
                        }
                        className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3 text-sm outline-none focus:border-[#0B5FC4]"
                      >

                        <option value="">
                          Select emirate
                        </option>

                        <option value="Abu Dhabi">
                          Abu Dhabi
                        </option>

                        <option value="Ajman">
                          Ajman
                        </option>

                        <option value="Dubai">
                          Dubai
                        </option>

                        <option value="Fujairah">
                          Fujairah
                        </option>

                        <option value="Ras Al Khaimah">
                          Ras Al Khaimah
                        </option>

                        <option value="Sharjah">
                          Sharjah
                        </option>

                        <option value="Umm Al Quwain">
                          Umm Al Quwain
                        </option>

                      </select>

                    </div>

                  </div>


                  {validationMessage && (

                    <p className="mt-4 text-sm text-red-600">
                      {validationMessage}
                    </p>

                  )}


                  <button
                    onClick={() => {

                      if (validateDriver()) {
                        setStep("contact");
                      }

                    }}
                    className="mt-6 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white hover:bg-[#084B9E]"
                  >
                    Continue to Contact Details
                  </button>


                  <button
                    onClick={() =>
                      setStep("vehicle")
                    }
                    className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                  >
                    ← Back
                  </button>

                </div>

              )}


              {/* ==========================================================
                  CONTACT
              ========================================================== */}

              {step === "contact" && (

                <div>

                  <div className="mb-6">

                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#1F7A43]">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1">
                        Step 3 of 3
                      </span>

                      Contact information

                    </div>


                    <h2 className="text-2xl font-bold text-[#0F1B33]">
                      Where should we send your quotes?
                    </h2>

                  </div>


                  <div className="space-y-4">


                    <input
                      placeholder="Full name"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none focus:border-[#0B5FC4]"
                    />


                    <input
                      placeholder="+971 XX XXX XXXX"
                      value={contact.mobile}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          mobile: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none focus:border-[#0B5FC4]"
                    />


                    <input
                      type="email"
                      placeholder="Email address"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none focus:border-[#0B5FC4]"
                    />

                  </div>


                  {/* CONSENT */}

                  <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#6B6B6B]">

                    <input
                      type="checkbox"
                      checked={contact.consent}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          consent: e.target.checked,
                        })
                      }
                      className="mt-1 h-4 w-4 accent-[#0B5FC4]"
                    />

                    <span>
                      I authorize the processing of my information for the
                      purpose of obtaining insurance quotations and agree to
                      the Privacy Notice and Terms & Conditions.
                    </span>

                  </label>


                  {validationMessage && (

                    <p className="mt-4 text-sm text-red-600">
                      {validationMessage}
                    </p>

                  )}


                  <button
                    onClick={() => {

                      if (validateContact()) {
                        requestQuotes();
                      }

                    }}
                    className="mt-6 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white hover:bg-[#084B9E]"
                  >
                    Compare Insurance Quotes
                  </button>


                  <button
                    onClick={() =>
                      setStep("driver")
                    }
                    className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                  >
                    ← Back
                  </button>

                </div>

              )}


              {/* ==========================================================
                  QUOTES
              ========================================================== */}

              {step === "quotes" && (

                <div>

                  <div className="mb-6">

                    <div className="mb-4 flex items-center justify-between">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1 text-xs font-bold text-[#1F7A43]">
                        Quotes ready
                      </span>

                      <span className="text-xs text-[#6B6B6B]">
                        {filteredQuotes.length} options
                      </span>

                    </div>


                    <h2 className="text-2xl font-bold text-[#0F1B33]">
                      Compare your insurance options
                    </h2>


                    <p className="mt-2 text-sm text-[#6B6B6B]">
                      Review premiums, coverage, benefits and excess before
                      choosing.
                    </p>

                  </div>


                  {/* FILTER */}

                  <div className="mb-5 flex gap-2 overflow-x-auto pb-1">

                    {[
                      ["both", "All"],
                      ["comprehensive", "Comprehensive"],
                      ["thirdParty", "Third Party"],
                    ].map(([value, label]) => (

                      <button
                        key={value}
                        onClick={() =>
                          setQuoteType(
                            value as QuoteType
                          )
                        }
                        className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${
                          quoteType === value
                            ? "bg-[#0B5FC4] text-white"
                            : "bg-[#EEF2F7] text-[#6B6B6B]"
                        }`}
                      >
                        {label}
                      </button>

                    ))}

                  </div>


                  {/* QUOTE CARDS */}

                  <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-3 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#CFEEDA] [&::-webkit-scrollbar-track]:bg-transparent">

                    {filteredQuotes.map(
                      (quote, index) => (

                        <div
                          key={quote.id}
                          className="w-[270px] shrink-0 snap-start rounded-2xl border border-[#E1E8F2] bg-white p-4 transition hover:border-[#0B5FC4] hover:shadow-md sm:w-full sm:shrink"
                        >

                          {/* insurer + best value tag */}

                          <div className="flex items-center justify-between gap-2">

                            <p className="text-xs font-bold uppercase tracking-wider text-[#0B5FC4]">
                              {quote.insurer}
                            </p>

                            {index === 0 && (
                              <span className="rounded-full bg-[#E1F5E7] px-2 py-0.5 text-[10px] font-bold text-[#1F7A43]">
                                Best value
                              </span>
                            )}

                          </div>


                          {/* type + price, side by side */}

                          <div className="mt-1 flex items-end justify-between gap-2">

                            <h3 className="font-bold text-[#0F1B33]">
                              {quote.type}
                            </h3>

                            <p className="text-xl font-bold leading-none text-[#0F1B33]">
                              AED{" "}
                              {quote.premium.toLocaleString()}
                            </p>

                          </div>

                          <p className="mt-1 text-xs text-[#6B6B6B]">
                            {quote.rating} provider · excl. charges
                          </p>


                          {/* excess / benefits, horizontal stat row */}

                          <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F4F8FC] px-3 py-2">

                            <div className="flex-1">
                              <p className="text-[10px] uppercase tracking-wide text-[#6B6B6B]">
                                Excess
                              </p>
                              <p className="text-sm font-bold text-[#0F1B33]">
                                AED {quote.excess.toLocaleString()}
                              </p>
                            </div>

                            <div className="h-8 w-px bg-[#E1E8F2]" />

                            <div className="flex-1">
                              <p className="text-[10px] uppercase tracking-wide text-[#6B6B6B]">
                                Benefits
                              </p>
                              <p className="text-sm font-bold text-[#0F1B33]">
                                {quote.benefits.length} included
                              </p>
                            </div>

                          </div>


                          {/* benefits as compact inline chips */}

                          <div className="mt-3 flex flex-wrap gap-1.5">

                            {quote.benefits
                              .slice(0, 3)
                              .map(
                                (benefit) => (

                                  <span
                                    key={benefit}
                                    className="inline-flex items-center gap-1 rounded-full border border-[#CFEEDA] bg-[#F4FBF7] px-2 py-1 text-[10px] font-medium text-[#1F7A43]"
                                  >
                                    <span className="font-bold">
                                      ✓
                                    </span>
                                    {benefit}
                                  </span>

                                )
                              )}

                          </div>


                          <button
                            onClick={() => {

                              setSelectedQuote(
                                quote
                              );

                              setStep("review");

                            }}
                            className="mt-4 w-full rounded-xl bg-[#0B5FC4] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#084B9E]"
                          >
                            Select this quote
                          </button>

                        </div>

                      )
                    )}

                  </div>

                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#1F7A43] sm:hidden">
                    <span aria-hidden="true">↔</span>
                    Swipe to compare more options
                  </p>


                  <button
                    onClick={resetQuote}
                    className="mt-5 w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                  >
                    Start a new quote
                  </button>

                </div>

              )}


              {/* ==========================================================
                  REVIEW
              ========================================================== */}

              {step === "review" &&
                selectedQuote && (

                  <div>

                    <div className="mb-7">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1 text-xs font-bold text-[#1F7A43]">
                        Review your selection
                      </span>


                      <h2 className="mt-4 text-2xl font-bold text-[#0F1B33]">
                        Review and proceed
                      </h2>


                      <p className="mt-2 text-sm text-[#6B6B6B]">
                        Please check the details below before continuing.
                      </p>

                    </div>


                    {/* SELECTED INSURER */}

                    <div className="rounded-2xl bg-[#F4F8FC] p-5">

                      <div className="flex items-start justify-between">

                        <div>

                          <p className="text-xs uppercase tracking-wider text-[#0B5FC4]">
                            Selected insurer
                          </p>

                          <h3 className="mt-1 text-xl font-bold">
                            {selectedQuote.insurer}
                          </h3>

                          <p className="mt-1 text-sm text-[#6B6B6B]">
                            {selectedQuote.type}
                          </p>

                        </div>


                        <div className="text-right">

                          <p className="text-2xl font-bold text-[#0B5FC4]">
                            AED{" "}
                            {selectedQuote.premium.toLocaleString()}
                          </p>

                          <p className="text-xs text-[#6B6B6B]">
                            Premium
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">


                      <div className="rounded-xl border border-[#E1E8F2] p-4">

                        <p className="text-xs text-[#6B6B6B]">
                          Vehicle
                        </p>

                        <p className="mt-1 font-semibold">
                          {vehicle.make}{" "}
                          {vehicle.model}
                        </p>

                        <p className="text-xs text-[#6B6B6B]">
                          {vehicle.year} ·{" "}
                          {vehicle.trim ||
                            "Standard"}
                        </p>

                      </div>


                      <div className="rounded-xl border border-[#E1E8F2] p-4">

                        <p className="text-xs text-[#6B6B6B]">
                          Customer
                        </p>

                        <p className="mt-1 font-semibold">
                          {contact.name}
                        </p>

                        <p className="text-xs text-[#6B6B6B]">
                          {contact.email}
                        </p>

                      </div>


                      <div className="rounded-xl border border-[#E1E8F2] p-4">

                        <p className="text-xs text-[#6B6B6B]">
                          Excess
                        </p>

                        <p className="mt-1 font-semibold">
                          AED{" "}
                          {selectedQuote.excess.toLocaleString()}
                        </p>

                      </div>


                      <div className="rounded-xl border border-[#E1E8F2] p-4">

                        <p className="text-xs text-[#6B6B6B]">
                          Registration
                        </p>

                        <p className="mt-1 font-semibold">
                          {vehicle.registration}
                        </p>

                      </div>

                    </div>


                    {/* TERMS */}

                    <div className="mt-6 rounded-xl border border-[#E1E8F2] p-4">

                      <p className="text-sm font-bold">
                        Important
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#6B6B6B]">
                        Final premium, coverage, terms, conditions and
                        eligibility are subject to the selected insurer&apos;s
                        underwriting and policy documentation.
                      </p>

                    </div>


                    <button
                      onClick={() =>
                        setStep("documents")
                      }
                      className="mt-6 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white hover:bg-[#084B9E]"
                    >
                      Continue to Document Upload
                    </button>


                    <button
                      onClick={() =>
                        setStep("quotes")
                      }
                      className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                    >
                      ← Compare other quotes
                    </button>

                  </div>

                )}


              {/* ==========================================================
                  DOCUMENTS
              ========================================================== */}

              {step === "documents" &&
                selectedQuote && (

                  <div>

                    <div className="mb-7">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1 text-xs font-bold text-[#1F7A43]">
                        Almost there
                      </span>


                      <h2 className="mt-4 text-2xl font-bold text-[#0F1B33]">
                        Upload your documents
                      </h2>


                      <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                        We&apos;ll scan each document and detect the relevant
                        details automatically. This helps us verify your
                        policy before payment.
                      </p>

                    </div>


                    <div className="space-y-4">

                      {(
                        Object.keys(documentConfig) as DocumentKey[]
                      ).map((key) => {

                        const config = documentConfig[key];
                        const slot = documents[key];

                        return (

                          <div
                            key={key}
                            className={`rounded-2xl border p-4 transition ${
                              slot.status === "validated"
                                ? "border-[#28734A]/30 bg-[#E8F3EC]"
                                : slot.status === "error"
                                ? "border-red-300 bg-red-50"
                                : "border-[#E1E8F2]"
                            }`}
                          >

                            <div className="flex items-start gap-4">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl">
                                {config.icon}
                              </div>


                              <div className="min-w-0 flex-1">

                                <div className="flex items-start justify-between gap-3">

                                  <div>

                                    <p className="font-semibold text-[#0F1B33]">
                                      {config.title}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#6B6B6B]">
                                      {config.description}
                                    </p>

                                  </div>


                                  {slot.status === "validated" && (

                                    <span className="shrink-0 rounded-full bg-[#28734A] px-2 py-1 text-[10px] font-bold text-white">
                                      Verified
                                    </span>

                                  )}

                                </div>


                                {/* EMPTY STATE — upload button */}

                                {slot.status === "empty" && (

                                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#E1E8F2] px-4 py-2.5 text-xs font-semibold text-[#0B5FC4] transition hover:border-[#0B5FC4] hover:bg-[#E8F1FC]">

                                    <span>⬆</span>

                                    Upload document

                                    <input
                                      type="file"
                                      accept={config.accept}
                                      className="hidden"
                                      onChange={(e) =>
                                        handleDocumentUpload(
                                          key,
                                          e.target.files?.[0] ?? null
                                        )
                                      }
                                    />

                                  </label>

                                )}


                                {/* UPLOADING */}

                                {slot.status === "uploading" && (

                                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#6B6B6B]">

                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#E1E8F2] border-t-[#0B5FC4]" />

                                    Uploading {slot.fileName}…

                                  </div>

                                )}


                                {/* VALIDATING */}

                                {slot.status === "validating" && (

                                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#6B6B6B]">

                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#E1E8F2] border-t-[#0B5FC4]" />

                                    Scanning document and detecting details…

                                  </div>

                                )}


                                {/* VALIDATED */}

                                {slot.status === "validated" && (

                                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2">

                                    <div className="text-xs text-[#6B6B6B]">

                                      <span className="text-[#28734A]">
                                        ✓
                                      </span>{" "}

                                      {slot.fileName}

                                      <span className="mx-1.5">
                                        ·
                                      </span>

                                      {slot.detectedLabel}{" "}

                                      <span className="font-semibold text-[#0F1B33]">
                                        {slot.detectedValue}
                                      </span>

                                    </div>


                                    <button
                                      onClick={() =>
                                        removeDocument(key)
                                      }
                                      className="text-xs font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                                    >
                                      Replace
                                    </button>

                                  </div>

                                )}


                                {/* ERROR */}

                                {slot.status === "error" && (

                                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

                                    <p className="text-xs font-semibold text-red-600">
                                      {slot.errorMessage ||
                                        "Couldn't read this document. Please try again."}
                                    </p>


                                    <label className="cursor-pointer text-xs font-semibold text-[#0B5FC4] hover:underline">

                                      Re-upload

                                      <input
                                        type="file"
                                        accept={config.accept}
                                        className="hidden"
                                        onChange={(e) =>
                                          handleDocumentUpload(
                                            key,
                                            e.target.files?.[0] ?? null
                                          )
                                        }
                                      />

                                    </label>

                                  </div>

                                )}

                              </div>

                            </div>

                          </div>

                        );

                      })}

                    </div>


                    <p className="mt-5 text-xs leading-5 text-[#6B6B6B]">
                      Accepted formats: JPG, PNG or PDF. Your documents are
                      used only to verify your policy details.
                    </p>


                    <button
                      onClick={() =>
                        allDocumentsValidated &&
                        setStep("payment")
                      }
                      disabled={!allDocumentsValidated}
                      className={`mt-6 w-full rounded-xl px-5 py-4 text-sm font-bold transition ${
                        allDocumentsValidated
                          ? "bg-[#0B5FC4] text-white hover:bg-[#084B9E]"
                          : "cursor-not-allowed bg-[#EEF2F7] text-[#6B6B6B]"
                      }`}
                    >
                      {allDocumentsValidated
                        ? "Continue to Payment"
                        : "Upload all documents to continue"}
                    </button>


                    <button
                      onClick={() =>
                        setStep("review")
                      }
                      className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                    >
                      ← Back to review
                    </button>

                  </div>

                )}


              {/* ==========================================================
                  PAYMENT
              ========================================================== */}

              {step === "payment" &&
                selectedQuote && (

                  <div>

                    <div className="mb-7">

                      <span className="rounded-full bg-[#E1F5E7] px-3 py-1 text-xs font-bold text-[#1F7A43]">
                        Final step
                      </span>


                      <h2 className="mt-4 text-2xl font-bold text-[#0F1B33]">
                        Complete your purchase
                      </h2>


                      <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                        Continue to the secure payment process or request
                        assistance from our team.
                      </p>

                    </div>


                    <div className="rounded-2xl bg-[#F4F8FC] p-6">

                      <div className="flex justify-between">

                        <div>

                          <p className="text-xs text-[#6B6B6B]">
                            Selected policy
                          </p>

                          <p className="mt-1 font-bold">
                            {selectedQuote.insurer}
                          </p>

                          <p className="text-sm text-[#6B6B6B]">
                            {selectedQuote.type}
                          </p>

                        </div>


                        <div className="text-right">

                          <p className="text-xl font-bold text-[#0B5FC4]">
                            AED{" "}
                            {selectedQuote.premium.toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>


                    <button
                      onClick={() =>
                        setStep("success")
                      }
                      className="mt-6 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white hover:bg-[#084B9E]"
                    >
                      Continue to Secure Payment
                    </button>


                    <button
                      onClick={() =>
                        setStep("success")
                      }
                      className="mt-3 w-full rounded-xl border border-[#E1E8F2] px-5 py-4 text-sm font-semibold text-[#0F1B33] hover:border-[#0B5FC4] hover:text-[#0B5FC4]"
                    >
                      Request Sales Assistance
                    </button>


                    <p className="mt-5 text-center text-xs leading-5 text-[#6B6B6B]">
                      Payment integration will be connected to the approved
                      payment gateway through the ASP.NET backend.
                    </p>


                    <button
                      onClick={() =>
                        setStep("documents")
                      }
                      className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#6B6B6B] hover:text-[#0B5FC4]"
                    >
                      ← Back to documents
                    </button>

                  </div>

                )}


              {/* ==========================================================
                  SUCCESS
              ========================================================== */}

              {step === "success" && (

                <div className="py-8 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F3EC] text-3xl text-[#28734A]">
                    ✓
                  </div>


                  <h2 className="mt-6 text-3xl font-bold text-[#0F1B33]">
                    You&apos;re all set
                  </h2>


                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6B6B6B]">
                    Your policy application has been submitted successfully.
                    Your policy number and documents will be provided once
                    issuance is completed.
                  </p>


                  <div className="mt-7 rounded-2xl border border-[#E1E8F2] bg-[#F4F8FC] p-5 text-left">


                    <div className="flex justify-between py-2">

                      <span className="text-sm text-[#6B6B6B]">
                        Customer
                      </span>

                      <span className="text-sm font-semibold">
                        {contact.name}
                      </span>

                    </div>


                    <div className="flex justify-between py-2">

                      <span className="text-sm text-[#6B6B6B]">
                        Vehicle
                      </span>

                      <span className="text-sm font-semibold">
                        {vehicle.make}{" "}
                        {vehicle.model}
                      </span>

                    </div>


                    <div className="flex justify-between py-2">

                      <span className="text-sm text-[#6B6B6B]">
                        Insurer
                      </span>

                      <span className="text-sm font-semibold">
                        {selectedQuote?.insurer}
                      </span>

                    </div>

                  </div>


                  <button
                    onClick={resetQuote}
                    className="mt-7 w-full rounded-xl bg-[#0B5FC4] px-5 py-4 text-sm font-bold text-white hover:bg-[#084B9E]"
                  >
                    Start Another Quote
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          TRUST BAR
      ================================================================= */}

      <section className="border-b border-[#E1E8F2] bg-gradient-to-b from-white via-[#F6FBF8] to-[#EAF7EE]">

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

            <div>

              <p className="text-sm font-semibold text-[#0F1B33]">
                Built for drivers in the UAE
              </p>

              <p className="mt-1 text-xs text-[#6B6B6B]">
                Compare insurance options through one simple digital journey.
              </p>

            </div>


            <div className="flex flex-wrap justify-center gap-3">

              {[
                "Comprehensive",
                "Third Party",
                "Multiple Providers",
                "Secure Quote Journey",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-full border border-[#E1E8F2] bg-[#F4F8FC] px-4 py-2 text-xs font-semibold text-[#6B6B6B]"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          HOW IT WORKS
      ================================================================= */}

      <section
        id="how-it-works"
        className="bg-gradient-to-b from-white via-[#F6FBF8] to-[#EAF7EE] py-20 lg:py-28"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">


          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              How it works
            </p>


            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
              From vehicle details to policy
            </h2>


            <p className="mt-4 leading-7 text-[#6B6B6B]">
              A straightforward insurance journey designed around the way
              customers actually buy car insurance.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-4">

            {[
              [
                "01",
                "Enter your vehicle",
                "Use your VIN/chassis number or select your vehicle manually.",
              ],

              [
                "02",
                "Tell us about yourself",
                "Provide the driver and registration information required.",
              ],

              [
                "03",
                "Compare quotes",
                "Review insurance options, premiums, benefits and excess.",
              ],

              [
                "04",
                "Choose your policy",
                "Select your preferred option and continue towards issuance.",
              ],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="rounded-2xl border border-[#E1E8F2] bg-[#F4F8FC] p-6"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCEBFC] font-bold text-[#0B5FC4]">
                  {number}
                </div>


                <h3 className="mt-6 text-lg font-bold text-[#0F1B33]">
                  {title}
                </h3>


                <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================================
          COVER TYPES
      ================================================================= */}

      <section className="bg-gradient-to-b from-[#F4FBF7] via-[#EFF8F2] to-[#E4F3E9] py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-2">


            {/* COMPREHENSIVE */}

            <div className="rounded-3xl bg-[#0F1B33] p-8 text-white lg:p-10">

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-[#0B5FC4] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                  Popular
                </span>

                <span className="text-3xl">
                  🛡
                </span>

              </div>


              <h3 className="mt-8 text-3xl font-bold">
                Comprehensive Insurance
              </h3>


              <p className="mt-4 max-w-lg leading-7 text-slate-300">
                Wider protection for your vehicle, subject to the policy
                terms, conditions and selected benefits.
              </p>


              <div className="mt-7 space-y-3">

                {[
                  "Own damage protection",
                  "Third-party liability",
                  "Optional additional benefits",
                  "Roadside assistance may be available",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >

                    <span className="text-[#DCEBFC]">
                      ✓
                    </span>

                    {item}

                  </div>

                ))}

              </div>


              <button
                onClick={() => {

                  setQuoteType("comprehensive");
                  setStep("start");

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });

                }}
                className="mt-8 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0B5FC4] transition hover:bg-[#F4F8FC]"
              >
                Compare Comprehensive
              </button>

            </div>


            {/* THIRD PARTY */}

            <div className="rounded-3xl border border-[#E1E8F2] bg-white p-8 lg:p-10">

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-[#EEF2F7] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                  Essential
                </span>

                <span className="text-3xl">
                  🚘
                </span>

              </div>


              <h3 className="mt-8 text-3xl font-bold text-[#0F1B33]">
                Third Party Insurance
              </h3>


              <p className="mt-4 max-w-lg leading-7 text-[#6B6B6B]">
                Protection focused on your legal liability towards third
                parties, subject to the policy terms and conditions.
              </p>


              <div className="mt-7 space-y-3">

                {[
                  "Third-party liability protection",
                  "Essential cover",
                  "Straightforward policy structure",
                  "Suitable for eligible vehicles and drivers",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#6B6B6B]"
                  >

                    <span className="font-bold text-[#28734A]">
                      ✓
                    </span>

                    {item}

                  </div>

                ))}

              </div>


              <button
                onClick={() => {

                  setQuoteType("thirdParty");
                  setStep("start");

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });

                }}
                className="mt-8 rounded-xl border border-[#0B5FC4] px-6 py-3.5 text-sm font-bold text-[#0B5FC4] transition hover:bg-[#DCEBFC]"
              >
                Compare Third Party
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          WHY US
      ================================================================= */}

      <section
        id="why-us"
        className="bg-gradient-to-b from-white via-[#F6FBF8] to-[#EAF7EE] py-20 lg:py-28"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">


            <div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
                Why choose us
              </p>


              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
                Insurance without the confusion.
              </h2>


              <p className="mt-5 max-w-xl leading-7 text-[#6B6B6B]">
                We&apos;re building a simpler way for drivers in Dubai and
                across the UAE to understand, compare and purchase car
                insurance.
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              {[
                [
                  "01",
                  "Simple",
                  "A guided digital journey instead of complicated insurance forms.",
                  "#0B5FC4",
                  "#E1EDFB",
                ],

                [
                  "02",
                  "Transparent",
                  "See premium, coverage, benefits and excess before you choose.",
                  "#2FA82A",
                  "#E4F5E1",
                ],

                [
                  "03",
                  "UAE focused",
                  "Designed around the needs of drivers and vehicles in the UAE.",
                  "#7C3AED",
                  "#EFE6FD",
                ],

                [
                  "04",
                  "Secure",
                  "Your information should move through the quotation process securely.",
                  "#E8720C",
                  "#FCE8D6",
                ],
              ].map(([number, title, text, accent, accentBg]) => (

                <div
                  key={number}
                  className="rounded-2xl border border-[#E1E8F2] p-6"
                >

                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold"
                    style={{ backgroundColor: accentBg, color: accent }}
                  >
                    {number}
                  </span>


                  <h3 className="mt-4 font-bold text-[#0F1B33]">
                    {title}
                  </h3>


                  <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                    {text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          INSURERS
      ================================================================= */}

      <section className="bg-gradient-to-b from-[#F4FBF7] via-[#EFF8F2] to-[#E4F3E9] py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">


          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              Insurance providers
            </p>


            <h2 className="mt-3 text-3xl font-bold text-[#0F1B33]">
              Compare eligible options in one place
            </h2>


            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6B6B6B]">
              Provider availability depends on your vehicle, driver profile,
              eligibility and underwriting criteria.
            </p>

          </div>


          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              "Insurer A",
              "Insurer B",
              "Insurer C",
              "Insurer D",
              "Insurer E",
              "Insurer F",
              "Insurer G",
              "Insurer H",
            ].map((insurer) => (

              <div
                key={insurer}
                className="flex h-24 items-center justify-center rounded-2xl border border-[#E1E8F2] bg-white text-sm font-bold text-[#6B6B6B]"
              >
                {insurer}
              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================================
          REVIEWS
      ================================================================= */}

      <section className="bg-gradient-to-b from-white via-[#F6FBF8] to-[#EAF7EE] py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">


          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              Customer experience
            </p>


            <h2 className="mt-3 text-3xl font-bold text-[#0F1B33]">
              Built around the customer
            </h2>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              [
                "The process was much easier than I expected. I could see the different options clearly before deciding.",
                "Dubai driver",
              ],

              [
                "Having the vehicle information and quote journey in one place makes the process much simpler.",
                "UAE customer",
              ],

              [
                "The comparison approach makes it easier to understand what you are actually paying for.",
                "Dubai customer",
              ],
            ].map(([review, author]) => (

              <div
                key={author}
                className="rounded-2xl border border-[#E1E8F2] bg-[#F4F8FC] p-7"
              >

                <div className="text-lg tracking-widest text-[#0B5FC4]">
                  ★★★★★
                </div>


                <p className="mt-5 text-sm leading-7 text-[#6B6B6B]">
                  “{review}”
                </p>


                <p className="mt-6 text-sm font-bold text-[#0F1B33]">
                  {author}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================================
          FAQ
      ================================================================= */}

      <section
        id="faq"
        className="bg-gradient-to-b from-[#F4FBF7] via-[#EFF8F2] to-[#E4F3E9] py-20 lg:py-28"
      >

        <div className="mx-auto max-w-4xl px-6 lg:px-8">


          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              FAQ
            </p>


            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
              Frequently asked questions
            </h2>

          </div>


          <div className="mt-12 space-y-4">

            {[
              [
                "What information do I need to get a quote?",
                "You will generally need information about your vehicle, driver, registration and contact details. The exact information required can vary depending on the insurance provider.",
              ],

              [
                "Can I use my VIN or chassis number?",
                "Yes. The quotation journey can use a VIN or chassis lookup service to retrieve available vehicle information. You can also enter your vehicle details manually.",
              ],

              [
                "What is the difference between comprehensive and third-party insurance?",
                "Comprehensive insurance generally provides broader protection for your own vehicle in addition to third-party liability, while third-party insurance primarily covers your legal liability towards third parties. Actual coverage depends on the policy.",
              ],

              [
                "Will I see the final price before purchasing?",
                "The platform is designed to show quotation information returned by the relevant insurer, including premium, applicable charges, coverage, benefits and excess, subject to underwriting and final policy terms.",
              ],

              [
                "Is my information secure?",
                "Your personal and vehicle information should be handled securely throughout the quotation process. Production implementation will connect the frontend to your ASP.NET backend and approved systems using secure API communication.",
              ],

              [
                "Can I get help choosing a policy?",
                "Yes. Depending on your business process, customers can request assistance from your sales or support team before proceeding with a selected quote.",
              ],
            ].map(([question, answer]) => (

              <details
                key={question}
                className="group rounded-2xl border border-[#E1E8F2] bg-white p-6"
              >

                <summary className="cursor-pointer list-none font-semibold text-[#0F1B33]">

                  {question}

                  <span className="float-right text-xl font-normal text-[#0B5FC4] transition group-open:rotate-45">
                    +
                  </span>

                </summary>


                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
                  {answer}
                </p>

              </details>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================================
          FINAL CTA
      ================================================================= */}

      <section className="bg-[#0B5FC4]">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">


            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#DCEBFC]">
                Ready when you are
              </p>


              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Find the right car insurance for your journey.
              </h2>


              <p className="mt-4 leading-7 text-[#CFE3FB]">
                Start with your vehicle details and compare eligible insurance
                options in one simple process.
              </p>

            </div>


            <button
              onClick={() => {

                setStep("start");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

              }}
              className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#0B5FC4] transition hover:bg-[#F4F8FC]"
            >
              Get a Car Insurance Quote
            </button>

          </div>

        </div>

      </section>


      {/* ================================================================
          FOOTER
      ================================================================= */}

      <footer className="bg-[#0F1B33] text-white">

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">


          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


            {/* BRAND */}

            <div>

              <a href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-full.png"
                  alt="checkinsure.ae — Compare, Choose, Be Covered"
                  className="h-24 w-auto sm:h-28"
                />
              </a>


              <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
                A digital car insurance comparison platform designed for
                drivers in Dubai and across the UAE.
              </p>

            </div>


            {/* COMPANY */}

            <div>

              <h3 className="font-semibold">
                Company
              </h3>


              <div className="mt-5 space-y-3 text-sm text-slate-400">

                <a
                  href="/about-us"
                  className="block transition hover:text-white"
                >
                  About Us
                </a>


                <a
                  href="/contact-us"
                  className="block transition hover:text-white"
                >
                  Contact Us
                </a>


                <a
                  href="#why-us"
                  className="block transition hover:text-white"
                >
                  Why Us
                </a>


                <a
                  href="#faq"
                  className="block transition hover:text-white"
                >
                  FAQ
                </a>

              </div>

            </div>


            {/* INSURANCE */}

            <div>

              <h3 className="font-semibold">
                Car Insurance
              </h3>


              <div className="mt-5 space-y-3 text-sm text-slate-400">

                <a
                  href="/"
                  className="block transition hover:text-white"
                >
                  Compare Car Insurance
                </a>


                <a
                  href="/"
                  className="block transition hover:text-white"
                >
                  Comprehensive Insurance
                </a>


                <a
                  href="/"
                  className="block transition hover:text-white"
                >
                  Third Party Insurance
                </a>


                <a
                  href="/"
                  className="block transition hover:text-white"
                >
                  Get a Quote
                </a>

              </div>

            </div>


            {/* CONTACT */}

            <div>

              <h3 className="font-semibold">
                Contact
              </h3>


              <div className="mt-5 space-y-4 text-sm text-slate-400">

                <a
                  href="mailto:hello@yourdomain.com"
                  className="block transition hover:text-white"
                >
                  hello@yourdomain.com
                </a>


                <a
                  href="tel:+971000000000"
                  className="block transition hover:text-white"
                >
                  +971 XX XXX XXXX
                </a>


                <p>
                  Dubai, United Arab Emirates
                </p>

              </div>

            </div>

          </div>


          {/* FOOTER BOTTOM */}

          <div className="mt-12 flex flex-col gap-5 border-t border-slate-700 pt-7 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">

            <p>
              © {new Date().getFullYear()} checkinsure.ae. All rights reserved.
            </p>


            <div className="flex flex-wrap gap-5">

              <a
                href="#"
                className="transition hover:text-white"
              >
                Privacy Policy
              </a>


              <a
                href="#"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </a>


              <a
                href="#"
                className="transition hover:text-white"
              >
                Cookie Policy
              </a>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}