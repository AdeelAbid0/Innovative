import svgPaths from "./svg-q963j19ivh";

function Frame() {
  return (
    <div className="h-[13.32px] relative w-[18px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 14">
        <g clipPath="url(#clip0_118_853)" id="Frame">
          <path clipRule="evenodd" d={svgPaths.p31afb900} fill="var(--fill-0, #292929)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_118_853">
            <rect fill="white" height="13.32" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame151() {
  return (
    <div className="bg-[#eaeaea] overflow-clip relative rounded-[99px] shrink-0 size-10">
      <div className="absolute flex h-[21.92px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[21.92px]" style={{ top: "calc(50% + 0.345px)", left: "calc(50% + 0.073px)" }}>
        <div className="flex-none rotate-[315deg]">
          <Frame />
        </div>
      </div>
    </div>
  );
}

export default function Frame148() {
  return (
    <div className="bg-[#ffffff] relative rounded-[99px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.4)] size-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-center pl-5 pr-0.5 py-0.5 relative size-full">
          <div className="flex flex-col font-['Bebas_Neue:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#292929] text-[16px] text-nowrap tracking-[0.64px]">
            <p className="leading-[1.45] whitespace-pre">Get Free Quotation</p>
          </div>
          <Frame151 />
        </div>
      </div>
    </div>
  );
}