const HeroVideo = () => {
  return (
    <video
      src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
      className="w-full sm:w-full md:w-[90vw] lg:w-[80vw] xl:w-[50vw] h-auto m-10"
      controls={false}
      muted
      autoPlay
      loop
    />
  );
};

export default HeroVideo;
