import Image from "next/image";

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/morubi-mark.png"
        alt=""
        width={28}
        height={28}
        priority
        className="h-7 w-7 object-contain"
      />
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        Morubi
      </span>
    </span>
  );
}
