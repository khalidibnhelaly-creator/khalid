import Image from "next/image";
import { clients } from "@/lib/content";

export function ClientWall() {
  return (
    <section className="k-section k-band">
      <div className="k-container">
        <div className="k-label">
          <span>Selected clients</span>
          <span>2013–2026</span>
        </div>

        <ul className="wall reveal" aria-label="Brands Khalid has worked with">
          {clients.map((c) => (
            <li className="wall-cell" key={c.name}>
              <Image
                src={c.src}
                alt={c.name}
                width={140}
                height={48}
                sizes="140px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
