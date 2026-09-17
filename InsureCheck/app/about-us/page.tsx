"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutUs() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F8FC] text-[#1C2333]">

      {/* ================================================================
          TODO HEADER
          SAME STYLE AS LANDING PAGE
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
          ABOUT HERO
      ================================================================= */}

      <section className="relative overflow-hidden bg-white">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">

          {/* LEFT */}

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E1E8F2] bg-[#F4F8FC] px-4 py-2 text-sm font-semibold text-[#0B5FC4]">

              <span className="h-2 w-2 rounded-full bg-[#0B5FC4]" />

              About insurecheck.ae

            </div>


            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#0F1B33] sm:text-5xl">

              Making car insurance

              <span className="block text-[#0B5FC4]">
                simpler for Dubai.
              </span>

            </h1>


            <p className="mt-6 max-w-lg text-lg leading-8 text-[#6B6B6B]">

              We believe buying car insurance shouldn&apos;t mean visiting
              multiple websites, comparing confusing policies or spending
              hours trying to understand your options.

            </p>


            <p className="mt-4 max-w-lg leading-7 text-[#6B6B6B]">

              insurecheck.ae is built to make the insurance journey easier by
              bringing vehicle information, driver details, quotations and
              policy selection together in one digital experience.

            </p>


            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-[#0B5FC4] px-7 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#084B9E]"
            >
              Compare Car Insurance →
            </Link>

          </div>


          {/* RIGHT VISUAL */}

          <div className="relative">

            <div className="rounded-2xl bg-[#0F1B33] p-7 shadow-xl sm:p-10">

              <div className="rounded-2xl bg-white p-7">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B]">
                      Our approach
                    </div>

                    <div className="mt-2 text-2xl font-bold text-[#0F1B33]">
                      Simple.
                    </div>

                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F8FC] text-2xl">
                    🚗
                  </div>

                </div>


                <div className="mt-8 space-y-4">

                  {[
                    "Enter your vehicle details",
                    "Compare available insurance options",
                    "Choose the coverage that suits you",
                    "Complete your insurance journey",
                  ].map((item, index) => (

                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-xl bg-[#F4F8FC] p-4"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B5FC4] text-xs font-bold text-white">
                        {index + 1}
                      </div>

                      <div className="text-sm font-semibold text-[#0F1B33]">
                        {item}
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>


            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#E1E8F2] bg-white px-5 py-4 shadow-xl sm:block">

              <div className="text-xs text-[#6B6B6B]">
                Built for
              </div>

              <div className="mt-1 font-bold text-[#0F1B33]">
                Dubai & UAE Drivers
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          WHO WE ARE
      ================================================================= */}

      <section className="bg-[#F4F8FC] py-20">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>

              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
                Who we are
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
                Insurance should be easier to understand
              </h2>

            </div>


            <div className="space-y-5 text-[#6B6B6B]">

              <p className="leading-8">

                Car insurance is an essential part of owning and driving a
                vehicle in the UAE. But finding the right policy can often
                involve comparing different providers, coverage options,
                prices and terms.

              </p>


              <p className="leading-8">

                We are building a digital-first insurance experience that
                simplifies that process. Instead of making customers search
                across different platforms, we bring the comparison journey
                into one place.

              </p>


              <p className="leading-8">

                From identifying your vehicle through its VIN or chassis
                number to comparing available quotations, our goal is to make
                every step clearer and more convenient.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          MISSION
      ================================================================= */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2">


            <div className="rounded-2xl bg-[#0B5FC4] p-8 text-white sm:p-12">

              <div className="text-5xl">
                🎯
              </div>

              <h2 className="mt-7 text-3xl font-bold">
                Our Mission
              </h2>

              <p className="mt-5 leading-8 text-[#DCEBFC]">

                To make car insurance simpler, more transparent and more
                accessible for drivers in Dubai and across the UAE.

              </p>

              <p className="mt-4 leading-8 text-[#DCEBFC]">

                We want customers to have the information they need to make
                confident insurance decisions without unnecessary complexity.

              </p>

            </div>


            <div>

              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
                What we believe
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
                Technology should remove complexity, not add to it
              </h2>

              <p className="mt-5 leading-8 text-[#6B6B6B]">

                Insurance involves important financial decisions. That&apos;s
                why our platform is designed around clarity, convenience and
                customer choice.

              </p>


              <div className="mt-7 space-y-4">

                {[
                  "Clear information",
                  "Simple digital journeys",
                  "Meaningful comparison",
                  "Customer-first support",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F8FC] text-sm font-bold text-[#0B5FC4]">
                      ✓
                    </div>

                    <span className="font-semibold text-[#0F1B33]">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          VISION
      ================================================================= */}

      <section className="bg-[#F4F8FC] py-20">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              Our Vision
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
              Build a better way to buy insurance
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#6B6B6B]">

              We envision a future where customers can easily understand
              their insurance choices, compare relevant options and complete
              their purchase digitally — without unnecessary friction.

            </p>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-[#E1E8F2] bg-white p-7 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F8FC] text-2xl">
                🔎
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0F1B33]">
                Discover
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                Make it easier to discover suitable insurance options.
              </p>

            </div>


            <div className="rounded-2xl border border-[#E1E8F2] bg-white p-7 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F8FC] text-2xl">
                📊
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0F1B33]">
                Compare
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                Help customers compare prices, coverage and benefits.
              </p>

            </div>


            <div className="rounded-2xl border border-[#E1E8F2] bg-white p-7 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F8FC] text-2xl">
                ✓
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0F1B33]">
                Choose
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                Give customers the confidence to choose the right option for
                their needs.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          VALUES
      ================================================================= */}

      <section className="bg-[#0F1B33] py-20 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#CFE3FB]">
              Our values
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What guides us
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              The principles behind the way we build our platform and serve
              our customers.
            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "💙",
                title: "Customer first",
                text: "We design our experience around the needs of the people using it.",
              },
              {
                icon: "🔍",
                title: "Transparency",
                text: "We believe customers should be able to understand what they are choosing.",
              },
              {
                icon: "⚡",
                title: "Simplicity",
                text: "We remove unnecessary steps and make complex processes easier.",
              },
              {
                icon: "🤝",
                title: "Trust",
                text: "Insurance decisions require confidence, responsibility and reliable support.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-7"
              >

                <div className="text-3xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================================
          HOW WE WORK
      ================================================================= */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              Built around your journey
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
              From vehicle details to policy
            </h2>

          </div>


          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                number: "01",
                title: "Vehicle",
                text: "Identify your vehicle through VIN or manual selection.",
              },
              {
                number: "02",
                title: "Driver",
                text: "Provide the information insurers need to assess your profile.",
              },
              {
                number: "03",
                title: "Quotes",
                text: "Compare available insurance quotations.",
              },
              {
                number: "04",
                title: "Policy",
                text: "Select your policy and complete the issuance process.",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="rounded-2xl border border-[#E1E8F2] p-7"
              >

                <div className="text-4xl font-bold text-[#E1E8F2]">
                  {item.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#0F1B33]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================================
          TRUST
      ================================================================= */}

      <section className="bg-[#F4F8FC] py-20">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="rounded-2xl border border-[#E1E8F2] bg-white p-8 sm:p-12">

            <div className="grid gap-10 md:grid-cols-3">

              <div className="text-center">

                <div className="text-3xl">
                  🔐
                </div>

                <h3 className="mt-4 font-bold text-[#0F1B33]">
                  Privacy
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  Customer information should be handled responsibly and
                  securely.
                </p>

              </div>


              <div className="text-center">

                <div className="text-3xl">
                  📋
                </div>

                <h3 className="mt-4 font-bold text-[#0F1B33]">
                  Clarity
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  We aim to make insurance information easier to understand.
                </p>

              </div>


              <div className="text-center">

                <div className="text-3xl">
                  🇦🇪
                </div>

                <h3 className="mt-4 font-bold text-[#0F1B33]">
                  UAE focused
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                  Our experience is designed with UAE drivers and the local
                  insurance journey in mind.
                </p>

              </div>

            </div>

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

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#CFE3FB]">
                Ready when you are
              </p>


              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to compare your car insurance?
              </h2>


              <p className="mt-4 leading-7 text-[#DCEBFC]">
                Start with your vehicle details and explore available
                insurance options for your car.
              </p>

            </div>


            <Link
              href="/"
              className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#0B5FC4] transition hover:bg-[#F4F8FC]"
            >
              Start Your Quote →
            </Link>

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

              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-full.png"
                  alt="insurecheck.ae — Compare, Choose, Be Covered"
                  className="h-24 w-auto sm:h-28"
                />
              </Link>


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

                <Link
                  href="/about-us"
                  className="block text-white"
                >
                  About Us
                </Link>


                <Link
                  href="/contact-us"
                  className="block transition hover:text-white"
                >
                  Contact Us
                </Link>


                <Link
                  href="/#why-us"
                  className="block transition hover:text-white"
                >
                  Why Us
                </Link>


                <Link
                  href="/#faq"
                  className="block transition hover:text-white"
                >
                  FAQ
                </Link>

              </div>

            </div>


            {/* INSURANCE */}

            <div>

              <h3 className="font-semibold">
                Car Insurance
              </h3>


              <div className="mt-5 space-y-3 text-sm text-slate-400">

                <Link
                  href="/"
                  className="block transition hover:text-white"
                >
                  Compare Car Insurance
                </Link>


                <Link
                  href="/"
                  className="block transition hover:text-white"
                >
                  Comprehensive Insurance
                </Link>


                <Link
                  href="/"
                  className="block transition hover:text-white"
                >
                  Third Party Insurance
                </Link>


                <Link
                  href="/"
                  className="block transition hover:text-white"
                >
                  Get a Quote
                </Link>

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
              © {new Date().getFullYear()} insurecheck.ae. All rights reserved.
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
