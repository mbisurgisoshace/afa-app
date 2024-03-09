import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PaisesDondeOpera() {
  return (
    <AccordionItem
      value="paises_donde_opera"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Paises donde opera</AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  );
}
