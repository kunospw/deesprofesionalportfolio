"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";

// EmailJS IDs are public by design (the SDK runs in the browser).
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_vnfccg8",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_85l0s48",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "5eS_Acn7LK7cMvz4J",
};

const field = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

export function ContactForm() {
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never see or fill this field.
    if (field(data, "company")) {
      form.reset();
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: field(data, "name"),
          from_email: field(data, "email"),
          subject: field(data, "subject") || "Portfolio enquiry",
          message: field(data, "message"),
        },
        { publicKey: EMAILJS.publicKey },
      );
      form.reset();
      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error("EmailJS send failed", error);
      toast.error("Couldn't send your message", {
        description: `Please try again, or email me at ${profile.email}.`,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-5 rounded-xl border bg-card/40 p-6 md:p-8"
    >
      <div aria-hidden="true" className="absolute top-auto -left-[10000px] size-px overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" name="subject" maxLength={150} placeholder="What's this about?" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          placeholder="Tell me about your project, idea or opening…"
          className="min-h-36"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={sending}>
        {sending ? <LoaderCircle className="animate-spin" /> : <SendHorizontal />}
        {sending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
