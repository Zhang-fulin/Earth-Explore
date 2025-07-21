import Wheel from "./Wheel";
import "./BottomXXXPanel.css"

export default function BottomTimePanel({
  onHourChange,
}: {
  onHourChange: (utc_Hour: number) => void;
}) {
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <div className="bottom-xxx-panel bottom-time-panel">
      <div className="bottom-xxx-panel-inner">
        <Wheel
          initIdx={currentHour}
          length={24}
          width={100}
          loop={true}
          setValue={(relative, absolute) => {
            return `|||||||||`;
          }}
          onChange={(relative, absolute) => {
            absolute;
            const now = new Date();
            now.setHours(relative, 0, 0, 0);
            onHourChange(now.getUTCHours());
          }}
        />
      </div>
    </div>
  );
}
