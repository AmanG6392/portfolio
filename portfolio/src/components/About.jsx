import React,{useRef, useEffect} from 'react'
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap" 
import { ScrollTrigger } from 'gsap/all';

const About = () => {

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const starRef = useRef([])


  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });

  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);
  const smoothScroll = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  const mountainY = useTransform(smoothScroll, [0, 0.5], ["0%", "10%"]);
  const opacity = useTransform(smoothScroll, [0, 0.3, 0.6], [0.7, 0.4, 0]); // fades smoothly

  useEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger)

    // Title Animation
    gsap.fromTo( 
      titleRef.current,
      { y:100, opacity: 0 },
      {
        y: -50,
        opacity: 1,
        duration: 0.8,
        scrollTrigger:{

          trigger:sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",

        }
      }
    )

    //text Animation
     gsap.fromTo(textRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          toggleActions: "play none none reverse"
        }
      }
    )
    
    // Image Animation
    gsap.fromTo(imageRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          toggleActions: "play none none reverse"
        }
      }
    )

    starRef.current.forEach((star, index) => {
      const direction = index % 2 === 0? 1: -1
      const speed = 0.5 + Math.random() * 0.5
      
      gsap.to(star,{
        x: `${direction * (100 + index * 20)}`,
        y: `${direction * -50 - index*10}`,
        rotation: direction * 360,
        ease: "none",
        scrollTrigger:{
          trigger: sectionRef.current,
          start:" top bottom",
          end: " bottom top",
          scrub: speed,
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger)=>{
        if(trigger.vars.trigger === sectionRef.current){
          trigger.kill()
        }
      })
    }

  })
 const addToStars = (el) => {
  if(el && !starRef.current.includes(el)){
    starRef.current.push(el)
  }
 }


  return (
   <section ref={sectionRef} className="relative h-screen bg-black/40 overflow-hidden">
  {/* Mountain reflection */}
  <motion.div
    className="absolute inset-0 -z-5 scale-y-[-1]"
    style={{
      backgroundImage: "url(/assets/mountain-1.png)",
      backgroundPosition: "bottom",
      backgroundSize: "cover",
      y: mountain1Y,
    }}
  />
  <div 
  className="absolute inset-0 overflow-hidden">
    {/* Stars */}
    {[...Array(10)].map((_, i) => (
      <div
      ref={addToStars}
      key={`star-${i}`}
      className='absolute rounded-full'
      style={{
        width: `${ 10 + i*3}px`,
        height: `${ 10 + i*3}px`,
        backgroundColor: "white",
        opacity:0.2 + Math.random()* 0.4,
        top:`${ Math.random() * 100 }%`,
        left: `${ Math.random() * 100 }%`,
      }}
      />
    ))}
  </div>

  {/* Gradient overlay */}
  <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent -z-0" />

  <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
    {/* Title */}
    <h1
      ref={titleRef}
      className="text-4xl md:text-6xl font-bold mb-8 text-white opacity-0"
    >
      About Me
    </h1>

    {/* Paragraph */}
    {/* Horizontal split with almost no space */}
        <div className='flex flex-col md:flex-row w-full md:h-[22rem] items-center justify-center'>
          {/* Left Half - Text */}
          <div ref={textRef} className="w-full md:w-2/3 flex items-center justify-end md:pr-[1px]  ">
            <h3 className="text-sm md:text-xl font-bold text-purple-200 max-w-xl leading-relaxed">
              Namaste! I’m Aman Gupta. A passionate Full-Stack Developer who loves
              to craft seamless digital experiences — from powerful backends to
              pixel-perfect frontends. I blend creativity and logic to design
              experiences that don’t just work — they wow. From UI animations to backend APIs,
              I bring ideas to life. A lifelong learner and Full-Stack
              Web Developer. I enjoy building interactive, user-focused applications
              that make technology feel human.
            </h3>
          </div>

          {/* Right Half - Image */}
          <div ref={imageRef} className="w-full md:w-1/3 flex items-center justify-center  md:justify-start md:pl-[1px]">
            <img
              className="lg:h-[22rem] md:h-[15rem] h-[10rem] mix-blend-lighten object-contain"
              src="/assets/person.png"
              alt="Aman Gupta"
            />
          </div>
        </div>

  </div>
</section>

  )
}

export default About