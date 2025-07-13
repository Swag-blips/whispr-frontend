"use client";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import GroupModal from "./GroupModal";

export const CreateGroup = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="size-10 flex items-center justify-center bg-[#F5F5F5] rounded-full cursor-pointer"
      >
        <Pencil color="#C4C4C4" size={16} />
      </div>
      {openModal && (
        <GroupModal open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
};
