import { cn } from "@/lib/utils";
import React from "react";

interface ExampleCardProps {
    sampleText?:string
    fontName:string
    cardColor:string
}

const ExampleCard:React.FC<ExampleCardProps> = ({sampleText,fontName, cardColor}) => {
    return ( 
        <div
            contentEditable
            translate="no"
            className={cn(
              "my-4 p-6 grid gap-4 *:overflow-hidden rounded-3xl md:gap-8 focus-visible:outline-none *:whitespace-normal *:leading-none transition-all",
              "shadow text-gray-500 text-opacity-50 focus-visible:text-opacity-100 ",
              "text-[6pt] md:text-[8pt]",
              "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
            )}
            style={{
              backgroundColor: cardColor,
              backgroundBlendMode: "soft-light",
              backgroundPosition: "center center",
              backgroundSize: "auto 100%",
              backgroundImage: `
								url("../utils/noise2.png"),
								linear-gradient(
									to top right,
									black,
									white
								)
							`,
              fontFamily: fontName,
            }}
          >
            {sampleText ? (
              <p className="text-[4em] col-span-full text-balance">
                {sampleText}
              </p>
            ) : null}
            <p className="text-[2em]">
              A font is a typesetting—text that is a particular size, weight,
              and style. In this context, we’re talking physical words. This
              harks back to those days when analogue printing was all the rage.
              Since the digital revolution, the word ‘font’ has been
              interchangeable with the word ‘typeface’ but if we’re being
              pedantic, that term more accurately means ‘font family’—a series
              of fonts with a similar design. The word ‘font’ comes from the
              Middle French word ‘fondre’—to melt, from the Latin
              ‘fundere’—melt, cast, pour out.
            </p>
            <div className="text-[1em] *:pb-[1rem] *:leading-none">
              <h4 className="font-bold">You can edit this textarea</h4>
              <p className="text-[0.5em]">A Brief History of Fonts</p>
              <p>
                Typography is the arrangement of words and letters (type) into
                something that’s readable. Not only readable type, but type
                that’s pleasing to the eye. A typographer would select a
                typeface (font family) along with size, line length, spacing and
                letter spacing.So everything we’re going to cover here comes
                under the banner of typography. With that being said, let’s
                strap ourselves into the time machine…
              </p>
              <p>
                It all started way back in the 11th century—the burgeoning days
                of printing. Typography began in China during the Song Dynasty.
                It was invented by a guy called Bi Sheng (990-1051). His
                lightbulb moment came between 1039 and 1048 when he created his
                movable type using porcelain. It was later discovered that wood
                was easier to replace—all you needed to do was quickly carve a
                new letter or character. Metal movable type was invented around
                1230 in Korea during the Goryeo Dynasty. Metal proved to be much
                more hardwearing than previous materials.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-8 text-[0.5em]">
                <p>
                  A German goldsmith named Johannes Gutenberg (c.1393-1406-1468)
                  invented the printing press around 1440 (other sources state
                  1436). His invention was a movable type printing press which
                  kicked off the printing revolution. With this new-fangled
                  press, he could print up to 3,600 pages per day—a shedload
                  more than hand printing, which could only manage a measly
                  forty pages per day. Pretty impressive and although Gutenberg
                  automated and mechanized the process of printing, in Asia,
                  they were using movable type for almost a century prior.
                </p>
                <p>
                  Not satisfied with inventing the first printing press, he had
                  to go develop the first font as well. It was a blackletter
                  variety resembling calligraphy. The French engineer, Nicholas
                  Jenson (c.1420-1480) developed one of the earliest Roman
                  typefaces in 1470. Jenson spent most of his time in Italy and,
                  like Johannes, was a printing pioneer. He helped to establish
                  Venice as one of the great centers of printing.
                </p>
              </div>
            </div>
            <p className="text-[6em] leading-[0.5em] sm:col-span-2 md:col-span-1">
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </p>
          </div>
     );
}
 
export default ExampleCard;