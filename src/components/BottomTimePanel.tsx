import Wheel from "./Wheel";
import "./BottomTimePanel.css";

export default function BottomTimePanel({
  onHourChange,
}: {
  onHourChange: (utc_Hour: number) => void;
}) {
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <div className="bottom-time-panel">
      <div className="bottom-time-panel-inner">
        <Wheel
          initIdx={currentHour}
          length={24}
          width={100}
          loop={true}
          setValue={(relative, absolute) => {
            relative;
            const hour = ((absolute % 24) + 24) % 24;
            return `${hour.toString().padStart(2, "0")}:00`;
          }}
          onChange={(relative, absolute) => {
            relative;
            const hour = ((absolute % 24) + 24) % 24;
            const now = new Date();
            now.setHours(hour, 0, 0, 0);
            onHourChange(now.getUTCHours());
          }}
        />
      </div>
    </div>
  );
}
