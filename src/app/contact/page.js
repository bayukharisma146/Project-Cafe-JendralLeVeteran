import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="p-6 md:p-10 bg-black min-h-screen">
      <div className="bg-black rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-6xl mx-auto">
        {/* Left: Image & Title */}
        <div className="md:w-1/2 relative min-h-[350px]">
          <Image
            src="/image/people/people6.jpg"
            alt="Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <h1 className="text-5xl md:text-6xl font-serif text-white p-8 pb-12 drop-shadow-lg">
              CONTACT
            </h1>
          </div>
        </div>
        {/* Right: Info */}
        <div className="md:w-1/2 bg-[#181818] text-white flex flex-col justify-between">
          {/* Opening Hours & Gallery */}
          <div className="flex flex-col md:flex-row gap-4 p-6 pb-2">
            {/* Opening Hours */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2 tracking-widest">
                OPENING HOURS
              </h2>
              <ul className="text-sm font-mono space-y-1">
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>09:00 - 23.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Monday</span>
                  <span>09:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Tuesday</span>
                  <span>09:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday</span>
                  <span>09:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Thursday</span>
                  <span>09:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>09:00 - 24:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>09:00 - 24:00</span>
                </li>
              </ul>
            </div>
            {/* Gallery */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Image
                src="/image/people/people3.jpg"
                alt="Gallery 1"
                width={120}
                height={80}
                className="rounded-lg object-cover aspect-[4/3] hover:scale-105 transition"
              />
              <Image
                src="/image/people/people2.jpg"
                alt="Gallery 2"
                width={120}
                height={80}
                className="rounded-lg object-cover aspect-[4/3] hover:scale-105 transition"
              />
              <Image
                src="/image/people/people5.jpg"
                alt="Gallery 3"
                width={120}
                height={80}
                className="rounded-lg object-cover aspect-[4/3] hover:scale-105 transition"
              />
              <Image
                src="/image/people/people1.jpg"
                alt="Gallery 4"
                width={120}
                height={80}
                className="rounded-lg object-cover aspect-[4/3] hover:scale-105 transition"
              />
            </div>
          </div>
          {/* Map & Contact */}
          <div className="flex flex-col md:flex-row gap-4 p-6 pt-2">
            {/* Map */}
            <div className="flex-2">
              <iframe
                title="Cafe Location"
                src="https://www.google.com/maps?q=-6.995833,110.411028&hl=id&z=16&output=embed"
                width="100%"
                height="180"
                className="rounded-lg border-0 w-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Contact Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-semibold">ADDRESS :</span>
                  <br />
                  Jl. Veteran No.12, Randusari, Kec. Semarang Sel., Kota
                  Semarang, Jawa Tengah 50232
                </div>
                <div>
                  <span className="font-semibold">PHONE :</span>
                  <br />
                  <a
                    href="https://wa.me/628175471111?text=Halo%2C%20saya%20ingin%20melakukan%20reservasi%20di%20Cafe%20Jendral%20Le%20Veteran."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-green-400 flex items-center gap-2"
                  >
                    {/* Ikon WhatsApp */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.52 3.48A12.04 12.04 0 0012 0C5.37 0 .02 5.37 0 12a11.96 11.96 0 001.62 6.1L0 24l6.27-1.64A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 .01-3.2-1.24-6.21-3.48-8.52zM12 22a9.96 9.96 0 01-5.3-1.55l-.38-.23-3.73.97.99-3.63-.24-.37A9.95 9.95 0 1122 12c0 5.52-4.48 10-10 10zm5.23-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.1-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.17-.32.2-.6.07-.28-.14-1.17-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.5.14-.17.18-.28.28-.47.09-.19.04-.35-.02-.5-.06-.14-.62-1.5-.85-2.05-.22-.53-.44-.46-.62-.47-.16-.01-.35-.01-.54-.01s-.5.07-.76.35c-.26.28-1 1-.96 2.44.04 1.43.99 2.82 1.13 3.01.14.19 1.94 3 4.7 4.19.66.28 1.17.45 1.57.57.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.89-1.31.24-.64.24-1.2.17-1.31-.07-.12-.25-.19-.53-.33z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
                <div>
                  <span className="font-semibold">EMAIL :</span>
                  <br />
                  <a
                    href="mailto:jenderal.leveteran@gmail.com"
                    className="hover:underline text-blue-300"
                  >
                    jendralleveteran@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-semibold">FOLLOW US ON :</span>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://www.instagram.com/jenderalleveteran?igsh=ZXF3ZmliZTlsOXJ3"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="hover:text-pink-400 transition"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="inline"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 2C4.243 2 2 4.243 2 7v6c0 2.757 2.243 5 5 5h6c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h6c1.654 0 3 1.346 3 3v6c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm6 1a1 1 0 100 2 1 1 0 000-2zm-3 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
