import React from 'react';
import { motion } from 'motion/react';

const S_WALLET_IMAGE = '/assets/aistudio/s_wallet_cutout.png';

export const SWalletShowcase: React.FC = () => {
  return (
    <section
      id="s-wallet"
      aria-labelledby="s-wallet-heading"
      className="bg-white text-[#111816] overflow-hidden"
    >
      <div className="w-full min-h-[84vh] sm:min-h-[88vh] pt-12 sm:pt-16 md:pt-20 pb-0 flex flex-col">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 items-stretch gap-8 sm:gap-0">
          {/* Left 50% Column: Entire Hand & S-WALLET anchored to bottom-left */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 sm:order-1 flex items-end justify-start pl-0 pr-4 sm:pr-6 md:pr-8"
          >
            <img
              src={S_WALLET_IMAGE}
              alt="Hand holding black leather Wing S-WALLET"
              referrerPolicy="no-referrer"
              className="block w-full max-w-[780px] max-h-[58vh] sm:max-h-[78vh] h-auto object-contain object-left-bottom select-none"
            />
          </motion.div>

          {/* Right 50% Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 sm:order-2 flex flex-col justify-center pt-4 sm:pt-8 pb-4 sm:pb-16 md:pb-20 pl-5 sm:pl-6 md:pl-10 lg:pl-14 pr-5 sm:pr-10 lg:pr-16"
          >
            <div>
              <h2
                id="s-wallet-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal tracking-[-0.015em] uppercase text-[#111816] leading-none"
              >
                S-WALLET
              </h2>
              <p className="mt-2.5 sm:mt-3.5 text-base sm:text-lg md:text-xl lg:text-[1.45rem] font-normal tracking-[-0.01em] text-[#111816] leading-snug">
                “Đã” hơn một cú chạm màn hình
              </p>
            </div>

            <div className="mt-6 sm:mt-16 md:mt-24 lg:mt-28">
              <p className="italic text-base sm:text-lg md:text-xl lg:text-[1.45rem] font-normal text-[#111816] leading-snug">
                Bật mí:
                <br />
                Không làm bạn xao nhãng!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
