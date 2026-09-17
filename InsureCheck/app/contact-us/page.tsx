"use client";

import { FormEvent, useState } from "react";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO:
    // Replace this with your ASP.NET API endpoint later.
    // Example:
    // POST /api/contact
    //
    // const formData = new FormData(e.currentTarget);
    // await fetch("https://your-api.com/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: formData.get("name"),
    //     email: formData.get("email"),
    //     phone: formData.get("phone"),
    //     subject: formData.get("subject"),
    //     message: formData.get("message"),
    //   }),
    // });

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F4F8FC] text-[#1C2333]">

      {/* ================================================================
          HEADER
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
          HERO
      ================================================================= */}

      <section className="relative overflow-hidden bg-[#F4F8FC]">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Hero Content */}

            <div>

              <div className="mb-5 inline-flex items-center rounded-full border border-[#CFE3FB] bg-[#DCEBFC] px-4 py-2 text-sm font-semibold text-[#0B5FC4]">
                We&apos;re here to help
              </div>


              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#0F1B33] sm:text-5xl lg:text-6xl">
                Let&apos;s talk about
                <span className="text-[#0B5FC4]"> your insurance.</span>
              </h1>


              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B6B6B]">
                Have a question about car insurance, your quote, policy,
                payment or anything else? Our team is here to help make
                insurance simple.
              </p>


              <div className="mt-8 flex flex-wrap gap-4">

                <a
                  href="#contact-form"
                  className="rounded-xl bg-[#0B5FC4] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#084B9E]"
                >
                  Send us a message
                </a>


                <a
                  href="tel:+971000000000"
                  className="rounded-xl border border-[#E1E8F2] bg-white px-6 py-3.5 text-sm font-semibold text-[#0F1B33] transition hover:border-[#0B5FC4] hover:text-[#0B5FC4]"
                >
                  Call our team
                </a>

              </div>

            </div>


            {/* Hero Contact Card */}

            <div className="lg:pl-10">

              <div className="rounded-3xl border border-[#E1E8F2] bg-white p-7 shadow-xl shadow-[#0B5FC408]">

                <div className="mb-7">

                  <p className="text-sm font-bold uppercase tracking-widest text-[#0B5FC4]">
                    Contact information
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#0F1B33]">
                    We&apos;re just a message away
                  </h2>

                </div>


                {/* Email */}

                <div className="flex gap-4 border-b border-[#E1E8F2] pb-6">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCEBFC] text-xl">
                    ✉
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#6B6B6B]">
                      Email us
                    </p>

                    <a
                      href="mailto:hello@yourdomain.com"
                      className="mt-1 block font-semibold text-[#0F1B33] hover:text-[#0B5FC4]"
                    >
                      hello@yourdomain.com
                    </a>

                    <p className="mt-1 text-sm text-[#6B6B6B]">
                      We&apos;ll get back to you as soon as possible.
                    </p>

                  </div>

                </div>


                {/* Phone */}

                <div className="flex gap-4 border-b border-[#E1E8F2] py-6">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCEBFC] text-xl">
                    ☎
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#6B6B6B]">
                      Call us
                    </p>

                    <a
                      href="tel:+971000000000"
                      className="mt-1 block font-semibold text-[#0F1B33] hover:text-[#0B5FC4]"
                    >
                      +971 XX XXX XXXX
                    </a>

                    <p className="mt-1 text-sm text-[#6B6B6B]">
                      Available during business hours.
                    </p>

                  </div>

                </div>


                {/* Location */}

                <div className="flex gap-4 pt-6">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCEBFC] text-xl">
                    📍
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#6B6B6B]">
                      Our office
                    </p>

                    <p className="mt-1 font-semibold text-[#0F1B33]">
                      Dubai, United Arab Emirates
                    </p>

                    <p className="mt-1 text-sm text-[#6B6B6B]">
                      Serving customers across the UAE.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          CONTACT FORM + SIDEBAR
      ================================================================= */}

      <section
        id="contact-form"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28"
      >

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Left Content */}

          <div className="lg:col-span-2">

            <p className="text-sm font-bold uppercase tracking-widest text-[#0B5FC4]">
              Get in touch
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
              How can we help?
            </h2>

            <p className="mt-5 leading-7 text-[#6B6B6B]">
              Whether you&apos;re getting a quote for the first time or
              already have a policy with us, our team is happy to help.
            </p>


            {/* Support Topics */}

            <div className="mt-10 space-y-5">

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F8FC]">
                  🚗
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1B33]">
                    Car insurance quotes
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                    Need help understanding or comparing your insurance
                    options?
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F8FC]">
                  📄
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1B33]">
                    Policy assistance
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                    Questions about your policy, coverage, documents or
                    renewal?
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F8FC]">
                  💳
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1B33]">
                    Payment support
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                    Need help with payment or completing your purchase?
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F8FC]">
                  💬
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1B33]">
                    General enquiries
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                    Anything else? Send us a message and our team will help.
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* Contact Form */}

          <div className="lg:col-span-3">

            <div className="rounded-3xl border border-[#E1E8F2] bg-white p-7 shadow-xl shadow-[#0B5FC408] sm:p-9">

              {submitted ? (

                /* Success State */

                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F3EC] text-3xl text-[#28734A]">
                    ✓
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-[#0F1B33]">
                    Message received!
                  </h2>

                  <p className="mt-4 max-w-md leading-7 text-[#6B6B6B]">
                    Thank you for contacting us. Our team will review your
                    message and get back to you as soon as possible.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-xl border border-[#E1E8F2] px-6 py-3 text-sm font-semibold text-[#0F1B33] transition hover:border-[#0B5FC4] hover:text-[#0B5FC4]"
                  >
                    Send another message
                  </button>

                </div>

              ) : (

                <form onSubmit={handleSubmit}>

                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#0F1B33]">
                      Send us a message
                    </h2>

                    <p className="mt-2 text-sm text-[#6B6B6B]">
                      Fill in the details below and our team will contact you.
                    </p>
                  </div>


                  {/* Name + Phone */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-[#0F1B33]"
                      >
                        Full name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9B9B] focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                      />
                    </div>


                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-[#0F1B33]"
                      >
                        Mobile number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+971 XX XXX XXXX"
                        className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9B9B] focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                      />
                    </div>

                  </div>


                  {/* Email */}

                  <div className="mt-5">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#0F1B33]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9B9B] focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                    />
                  </div>


                  {/* Subject */}

                  <div className="mt-5">
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-[#0F1B33]"
                    >
                      What can we help you with?
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-[#E1E8F2] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>

                      <option value="car-insurance-quote">
                        Car insurance quote
                      </option>

                      <option value="existing-policy">
                        Existing policy
                      </option>

                      <option value="payment">
                        Payment assistance
                      </option>

                      <option value="renewal">
                        Policy renewal
                      </option>

                      <option value="claims">
                        Claims enquiry
                      </option>

                      <option value="general">
                        General enquiry
                      </option>
                    </select>
                  </div>


                  {/* Message */}

                  <div className="mt-5">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-[#0F1B33]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-[#E1E8F2] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9B9B] focus:border-[#0B5FC4] focus:ring-4 focus:ring-[#0B5FC4]/10"
                    />
                  </div>


                  {/* Consent */}

                  <div className="mt-5 flex items-start gap-3">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-[#E1E8F2] text-[#0B5FC4] focus:ring-[#0B5FC4]"
                    />

                    <label
                      htmlFor="privacy"
                      className="text-xs leading-5 text-[#6B6B6B]"
                    >
                      I agree to be contacted regarding my enquiry and
                      acknowledge the Privacy Notice and Terms & Conditions.
                    </label>
                  </div>


                  {/* Submit */}

                  <button
                    type="submit"
                    className="mt-7 w-full rounded-xl bg-[#0B5FC4] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#084B9E]"
                  >
                    Send Message
                  </button>


                  <p className="mt-4 text-center text-xs text-[#9B9B9B]">
                    Your information is handled securely and used only to
                    respond to your enquiry.
                  </p>

                </form>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================================
          FAQ / QUICK HELP
      ================================================================= */}

      <section className="bg-[#F4F8FC] py-20 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0B5FC4]">
              Quick answers
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1B33] sm:text-4xl">
              Before you contact us
            </h2>

            <p className="mt-4 text-[#6B6B6B]">
              You may find the answer you&apos;re looking for in our frequently
              asked questions.
            </p>

          </div>


          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">

            <details className="group rounded-2xl border border-[#E1E8F2] bg-white p-6">
              <summary className="cursor-pointer list-none font-semibold text-[#0F1B33]">
                How can I get a car insurance quote?
                <span className="float-right text-xl font-normal text-[#0B5FC4] transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
                Start by clicking &quot;Get a Quote&quot;. You can enter your
                vehicle details using your VIN/chassis number or select your
                vehicle manually. We&apos;ll then collect the information
                required to compare available insurance options.
              </p>
            </details>


            <details className="group rounded-2xl border border-[#E1E8F2] bg-white p-6">
              <summary className="cursor-pointer list-none font-semibold text-[#0F1B33]">
                Can I compare different insurers?
                <span className="float-right text-xl font-normal text-[#0B5FC4] transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
                Yes. Our platform is designed to allow customers to compare
                eligible insurance quotes, coverage, benefits, excess and
                pricing in one place.
              </p>
            </details>


            <details className="group rounded-2xl border border-[#E1E8F2] bg-white p-6">
              <summary className="cursor-pointer list-none font-semibold text-[#0F1B33]">
                Do I need my VIN/chassis number?
                <span className="float-right text-xl font-normal text-[#0B5FC4] transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
                Not necessarily. If you have your VIN/chassis number, it can
                be used to retrieve vehicle information. You can also enter
                your vehicle details manually.
              </p>
            </details>


            <details className="group rounded-2xl border border-[#E1E8F2] bg-white p-6">
              <summary className="cursor-pointer list-none font-semibold text-[#0F1B33]">
                Can you help me after I purchase a policy?
                <span className="float-right text-xl font-normal text-[#0B5FC4] transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-sm leading-6 text-[#6B6B6B]">
                Yes. If you have questions about your policy, documents,
                payments or other support matters, you can contact our team
                using the details on this page.
              </p>
            </details>

          </div>

        </div>

      </section>


      {/* ================================================================
          CTA
      ================================================================= */}

      <section className="bg-[#0B5FC4]">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#CFE3FB]">
                Ready to get started?
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Compare your car insurance options today.
              </h2>

              <p className="mt-4 leading-7 text-[#DCEBFC]">
                Get started with your vehicle details and explore insurance
                options designed for drivers in the UAE.
              </p>

            </div>

            <a
              href="/"
              className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#0B5FC4] transition hover:bg-[#F4F8FC]"
            >
              Get a Car Insurance Quote
            </a>

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
                  alt="insurecheck.ae — Compare, Choose, Be Covered"
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
                  href="/#why-us"
                  className="block transition hover:text-white"
                >
                  Why Us
                </a>


                <a
                  href="/#faq"
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
