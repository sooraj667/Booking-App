import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
const TypeWriter = () => {
  const [text] = useTypewriter({
    words: ["BEAUTICIANS", "ONLINE WORKSHOPS"],
    loop: 5,
    //onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });
  return (
    <div>
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium fw-2 sgfont  themecolor ">
        BOOK {text}
        <Cursor />
      </div>
    </div>
  );
};

export default TypeWriter;
