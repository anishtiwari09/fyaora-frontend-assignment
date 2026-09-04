"use client";

import { useState } from "react";
import type { ServiceProvider } from "@/types/waitlist";
import { Modal } from "@/components/ui/Modal";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Pencil,
} from "lucide-react";

type ActionModalProps = {
  provider: ServiceProvider | null;
  onClose: () => void;
};

export function ActionModal({ provider, onClose }: ActionModalProps) {
  const [notes, setNotes] = useState("No Note Added yet");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  if (!provider) return null;

  return (
    <Modal
      open={Boolean(provider)}
      onClose={onClose}
      title="User Details"
      titleIcon={
        <User
          className="text-black"
          style={{  height: 18 }}
        />
      }
    >
      <div className="flex flex-col gap-4 text-[14px] leading-5 text-neutral-500">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[19px] font-semibold leading-6 text-black">
            CleanPro Solutions
          </span>
          <span className="rounded-full bg-[#f1f1f1] px-3 py-1 text-[12.5px] leading-none text-black">
            Customer
          </span>
          <span className="rounded-full bg-[#e6e6e6] px-3 py-1 text-[12.5px] leading-none text-black">
            invited
          </span>
        </div>

        <hr className="border-neutral-100" />

        <section className="flex flex-col gap-3">
          <h3 className="text-[17px] font-semibold leading-5 text-black">Contact Information</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-neutral-500" />
              <span className="truncate">{provider.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-neutral-500" />
              <span className="truncate">lisa.anderson@email.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 shrink-0 text-neutral-500" />
              <span>{provider.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-neutral-500" />
              <span>Signed up {provider.signupDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 shrink-0 text-neutral-500" />
              <span>United kingdom</span>
            </div>
          </div>
        </section>

        <hr className="border-neutral-100" />

        <section className="flex flex-col gap-3">
          <h3 className="text-[17px] font-semibold leading-5 text-black">Customer Details</h3>
          <div className="flex items-center gap-2">
            <User className="h-5 shrink-0 text-neutral-500" />
            <span>{provider.vendorType.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 shrink-0 text-neutral-500" />
            <span>{provider.serviceOffering.toLowerCase()}</span>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-[17px] font-semibold leading-5 text-black">User Details</h3>
          <div className="flex items-center gap-2">
            <span>Postcode: {provider.postcode}</span>
          </div>
        </section>

        <hr className="border-neutral-100" />

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 text-neutral-500" />
              <h3 className="text-[17px] font-semibold leading-5 text-black">Internal Notes</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingNotes((value) => !value)}
              className="flex items-center gap-1 text-[15px] font-medium text-black hover:underline focus:outline-none"
            >
              <Pencil className="h-4 w-4" />
              {isEditingNotes ? "Save" : "Edit"}
            </button>
          </div>

          {isEditingNotes ? (
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="resize-none bg-[#f9f9f9] text-[14px] leading-5 text-neutral-900 focus:outline-none"
              style={{
                width: 449.2,
                height: 103.9,
                borderRadius: 0.82,
                padding: 12,
              }}
            />
          ) : (
            <div
              className="bg-[#e9e9e9] text-[14px] leading-5 text-neutral-500"
              style={{ width: 449.2, height: 103.9, borderRadius: 0.82, padding: 12 }}
            >
              {notes}
            </div>
          )}
        </section>

        <div
          className="flex items-center justify-center"
          style={{ width: 331, height: 56, gap: 62, marginLeft: "auto", marginRight: "auto" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border-2 bg-[#1A78F2] text-[20px] font-medium leading-none tracking-[0.5px] text-white transition-opacity hover:opacity-90 focus:outline-none"
            style={{
              width: 149,
              height: 56,
              paddingTop: 16,
              paddingRight: 12,
              paddingBottom: 16,
              paddingLeft: 12,
              borderColor: "var(--Button-Color, #1A78F2)",
              boxShadow:
                "1px 1px 3px 0px #0000001A, 5px 3px 6px 0px #00000017, 10px 8px 8px 0px #0000000D, 18px 13px 9px 0px #00000003, 29px 21px 10px 0px #00000000",
            }}
          >
            Onboard
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border-2 bg-[#E11B1B] text-[20px] font-medium leading-none tracking-[0.5px] text-white transition-opacity hover:opacity-90 focus:outline-none"
            style={{
              width: 121,
              height: 56,
              paddingTop: 16,
              paddingRight: 12,
              paddingBottom: 16,
              paddingLeft: 12,
              borderColor: "#E11B1B",
              boxShadow:
                "1px 1px 3px 0px #0000001A, 5px 3px 6px 0px #00000017, 10px 8px 8px 0px #0000000D, 18px 13px 9px 0px #00000003, 29px 21px 10px 0px #00000000",
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
}
