import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

export const InfoDisclosure = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 rounded-md border border-kx-primary bg-kx-surface-raised p-2">
      <div
        className="w-full flex justify-between items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center justify-between gap-2 ">
          <Info size={16} className="text-kx-primary" />
          <span className="text-sm font-medium">
            {" "}
            Important Notes &amp; Disclaimers
          </span>
        </div>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {open && (
        <p className="text-xs mt-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste soluta,
          aut nesciunt illum magni velit quam alias quaerat commodi similique
          deleniti assumenda maiores aspernatur, nam ratione voluptatem.
          Accusamus, dolor magni. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Iste soluta, aut nesciunt illum magni velit quam
          alias quaerat commodi similique deleniti assumenda maiores aspernatur,
          nam ratione voluptatem. Accusamus, dolor magni. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Iste soluta, aut nesciunt illum
          magni velit quam alias quaerat commodi similique deleniti assumenda
           ratione voluptatem. Accusamus, dolor magni. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Iste soluta, aut nesciunt illum
          magni velit quam alias quaerat commodi similique deleniti assumen
           ratione voluptatem. Accusamus, dolor magni. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Iste soluta, aut nesciunt illum
          magni velit quam alias quaerat commodi similique deleniti assumen
          maiores aspernatur, nam ratione voluptatem. Accusamus, dolor magni.
        </p>
      )}
    </div>
  );
};
