import Image from "next/image";

/**
 * ZanzibarEnvironmentSides
 * Subtle ambient background featuring authentic Zanzibar palm trees, beaches,
 * traditional maritime dhows, and turquoise east shore waters visible along
 * the flanks of the website with soft opacity and gentle gradients.
 */
export default function ZanzibarEnvironmentSides() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Left Wing: Tropical Palm Trees & Pristine Coral Beach */}
      <div className="zanzibar-side-mask-left absolute top-0 bottom-0 left-0 w-36 sm:w-56 md:w-72 lg:w-88 xl:w-[420px] opacity-20 sm:opacity-25 md:opacity-30 transition-opacity duration-700">
        <div className="relative h-full w-full">
          <Image
            src="/images/zanzibar-beach.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 150px, (max-width: 1200px) 280px, 420px"
            className="object-cover object-left"
            priority
          />
          {/* Subtle turquoise ocean mist tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b4f48]/20 via-[#0d9488]/10 to-transparent" />
        </div>
      </div>

      {/* Right Wing: Maritime Dhow & East Shore Indian Ocean Waters */}
      <div className="zanzibar-side-mask-right absolute top-0 bottom-0 right-0 w-36 sm:w-56 md:w-72 lg:w-88 xl:w-[420px] opacity-20 sm:opacity-25 md:opacity-30 transition-opacity duration-700">
        <div className="relative h-full w-full">
          <Image
            src="/images/zanzibar-dhow.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 150px, (max-width: 1200px) 280px, 420px"
            className="object-cover object-right"
            priority
          />
          {/* Warm island sunrise gold & teal reflection */}
          <div className="absolute inset-0 bg-gradient-to-l from-amber-500/15 via-[#0d9488]/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}
