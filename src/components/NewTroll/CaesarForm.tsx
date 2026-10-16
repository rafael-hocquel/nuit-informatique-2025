"use client";
import React from "react";
import TrollInput from "./TrollInput";

const CaesarForm = ({
  onSubmit,
  onSkip,
  setInput,
  isChinese = false,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onSkip: () => void;
  setInput: (val: string) => void;
  isChinese?: boolean;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mt-4">
      <TrollInput onValueChange={setInput} />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isChinese ? "提交" : "Envoyer"}
      </button>
      <button
        type="button"
        onClick={onSkip}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {isChinese ? "跳过" : "Skip"}
      </button>
    </form>
  );
};

export default CaesarForm;
