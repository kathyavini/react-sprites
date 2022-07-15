import './MobileControls.css';

interface MobileControlsProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  jumping: boolean;
  setJumping: React.Dispatch<React.SetStateAction<boolean>>;
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  directionX: string;
  setDirectionX: React.Dispatch<React.SetStateAction<string>>;
  directionY: string;
  setDirectionY: React.Dispatch<React.SetStateAction<string>>;
}
export function MobileControls({
  position,
  setPosition,
  jumping,
  setJumping,
  running,
  setRunning,
  directionX,
  setDirectionX,
  directionY,
  setDirectionY,
}: MobileControlsProps) {
  function handleTap(event: any) {
    // console.log(event);

    const tapX = event.nativeEvent.layerX;
    const tapY = event.nativeEvent.layerY;
    // console.log(tapX, tapY);

    if (tapX > 20) {
      setRunning(true);
      setDirectionX('right');
      setPosition((prev) => [prev[0] + 25, prev[1]]);
    }

    if (tapX < 10) {
      setRunning(true);
      setDirectionX('left');
      setPosition((prev) => [prev[0] - 25, prev[1]]);
    }

    // For straight down and up, which I want to animate a little differently
    if (tapX > 14 && tapX < 19 && tapY < 10) {
      setRunning(true);
      setDirectionY('up');
      setDirectionX('straight');
      setPosition((prev) => [prev[0], prev[1] - 25]);
    }

    if (tapX > 14 && tapX < 18 && tapY > 20) {
      setRunning(true);
      setDirectionY('down');
      setDirectionX('straight');
      setPosition((prev) => [prev[0], prev[1] + 25]);
    }

    // Oops realized I needed this for straight left and right too
    if (tapY > 14 && tapY < 18 && tapX < 10) {
      setRunning(true);
      setDirectionY('straight');
      setDirectionX('left');
      setPosition((prev) => [prev[0] - 25, prev[1]]);
    }

    if (tapY > 14 && tapY < 18 && tapX > 20) {
      setRunning(true);
      setDirectionY('straight');
      setDirectionX('right');
      setPosition((prev) => [prev[0] + 25, prev[1]]);
    }

    if (tapY < 10) {
      setRunning(true);
      setDirectionY('up');
      setPosition((prev) => [prev[0], prev[1] - 25]);
    }

    if (tapY > 20) {
      setRunning(true);
      setDirectionY('down');
      setPosition((prev) => [prev[0], prev[1] + 25]);
    }
  }

  function handleJumpButton() {
    // if (running) {
    setJumping(true);
    // setRunning(true);
    // }
  }

  const directions = `${directionX} ${directionY}`;
  return (
    <>
      <div className="tap-box" onClick={handleTap}>
        <div className={`mobile-controls ${running ? directions : ''}`} />
      </div>
      <div className="jump-button" onClick={handleJumpButton}></div>
    </>
  );
}
