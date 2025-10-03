import React from "react";
import ReactSpeedometer from "react-d3-speedometer/slim";
import { GoChevronDown } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const data = [  
  ["56", "80", "71"],
  ["177", "2", "3"],
  [
    ["question1", "answer1", "avis1", "recommendation1"],
    ["question2", "answer2", "avis2", "recommendation2"]
  ]
];

const Card = ({ title, score }) => {
  return (
    
    <div className="relative w-[373px] h-[193px] bg-[#d9d9d93d] rounded-[22px] border border-solid border-[#f7f7f7] shadow-[0px_1px_4px_7px_#9d949440]">
      <div className="absolute top-[33px] left-[42px] w-[246px] [text-shadow:2px_8px_4px_#ffffff40] [-webkit-text-stroke:1px_#ffffff] font-normal text-white text-3xl tracking-[7.20px] leading-[36.6px]">
        {title}
      </div>

      <div className="absolute top-[73px] left-[101px] w-[135px] h-[68px]">
        <div className="absolute top-0 left-0 w-[82px] font-medium text-[#e4e4e4] text-[64px] leading-none whitespace-nowrap">
          {score}
        </div>
        <div className="absolute top-[39px] left-[72px] w-[59px] text-[#e4e4e4] text-2xl">
          /100
        </div>
      </div>

      <div className="absolute bottom-[4px] right-[10px] w-[120px] h-[100px] flex items-center justify-center">
        <ReactSpeedometer
          value={score}
          maxValue={100}
          width={120}
          height={100}
          needleHeightRatio={0.6}
          ringWidth={10}
          textColor="#e4e4e4"
          currentValueText=""
        />
      </div>
    </div>
  );
};

const Label = ({ text, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-between w-full px-[12px] bg-[#ffffff] rounded-[10px] shadow-[0px_0px_15px_#3333331a] ${className}`}
      style={{ minHeight: '47px' ,minWidth: '85vw'}} // ensures bigger height
    >
      <div className="flex items-center gap-4 h-full">
        <GoCheck className="w-6 h-6" color="#FF5900" />
        <div className="font-bold text-[#333333] px-[12px] text-base">{text}</div>
      </div>
      <GoChevronDown className="w-6 h-6" color="#FF5900" />
    </div>
  );
};
const Header = () => {
  return (
    <div className="w-full flex justify-center items-center px-[12px] mt-8">
      <h1 className="font-bold text-[white] text-[64px] text-center leading-[87.7px] font-oleo">
        The test was successful
      </h1>
      <div className="px-[32px]"
      style={{ width: 100, height: 100 }} >
        <CircularProgressbar
          value={66}
          text={`${66}%`}
          styles={buildStyles({
            pathColor: "#07ff8fff",
            textColor: "#ffffff",
            trailColor: "#b7ccffff",
          })}
        />
      </div>
    </div>
  );
};

export const TextComponent = ({ number, state, className = "" }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleOpen = (i) => {
    setOpenIndex(openIndex === i ? null : i);}
  return (
    <div
      className={`flex  bg-[#ffffff] rounded-[12px] flex-col w-[1361px] items-start gap-4 relative top-5 left-[10px] ${className}`}
      style={{ minWidth: '85vw' }}
    >
      {data[2].map((q, i) => (
      
      
      <div className="flex flex-col items-center justify-center gap-[3px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-row items-center justify-between w-full" onClick={() => toggleOpen(i)}>
      <div className="relative w-[86px] [font-family:Inter-ExtraBold,Helvetica] top-[10px] left-[10px] font-extrabold text-black text-[30px] leading-normal">
        {q[0]}
      </div>
      <GoArrowUp
              className={`bg-[#ffdfff] px-[10px] text-[24px] transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : "rotate-0"
              }`}
            />
    </div>
        <p className="relative self-stretch [font-family:'Regular',Helvetica] font-normal text-[#e4e4e4] text-[20px] left-[10px] tracking-[0] leading-[normal]">
            {`${q[1]}`}  {/* answer */}
          </p>
           {openIndex === i && (
  
<div className="flex w-full mt-6 px-[40px] gap-[40px] justify-center">
  {/* Première box */}
  <div className="flex flex-col w-[600px] bg-white rounded-[20px] shadow-[0px_0px_50px_#3333331a]">
    <div className="w-full h-[80px] flex items-center justify-center border-b border-[#e4e4e4] rounded-t-[20px]">
      <span className="font-semibold text-[#333333] text-4xl [font-family:'Saira-SemiBold',Helvetica] text-4xl">
        
        Avis
      </span>
    </div>
    <div className="flex flex-col gap-4 px-[40px]">
      <p className="text-lg [font-family:'Open_Sans-Regular',Helvetica] text-[#333333]">
        {q[2]}
      </p>
    </div>
  </div>

  {/* Deuxième box */}
  <div className="flex flex-col w-[600px] bg-white rounded-[20px] shadow-[0px_0px_50px_#3333331a]">
    <div className="w-full h-[80px] flex items-center justify-center border-b border-[#e4e4e4] rounded-t-[20px]">
      <span className="font-semibold text-[#333333] text-4xl [font-family:'Saira-SemiBold',Helvetica]">
        Recommandation
      </span>
    </div>
    <div className="flex flex-col gap-4 px-[40px]">
      <p className="text-lg [font-family:'Open_Sans-Regular',Helvetica] text-[#333333]">
        {q[3]}
      </p>
    </div>
  </div>
</div>


)}

      </div>))}

    </div>
  );
};

export const Report = () => {
  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,rgba(117,89,255,1)_0%,rgba(100,103,173,1)_100%)] flex flex-col items-center py-16">
      <Header />
      
      <div className="flex justify-between mb-16">
        <Card title="OVERVIEW" score={data[0][0]} />
        <Card title="TECHNIQUE" score={data[0][1]} />
        <Card title="SKILLS" score={data[0][2]} />
      </div>
      <div className="flex flex-col gap-16 mt-[20px] ">
        {data[1].map((q, i) => (
          <Label key={i} text={`${q[0]}`} className="mb-[5px] w-full " />
        ))}
      </div>
      <div className="mt-10">
    <TextComponent />
  </div>
    </div>
  );
};
