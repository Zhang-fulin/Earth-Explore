import Wheel from "./Wheel";
import "./BottomXXXPanel.css"
import { newsSources, NewsSourceDict} from "../types";

export default function BottomSourcePanel({
  onSourceChange,
}: {
  onSourceChange: (news_source: string) => void;
}) {
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <div className="bottom-xxx-panel bottom-source-panel">
      <div className="bottom-xxx-panel-inner">
        <Wheel
          initIdx={currentHour}
          length={36}
          width={100}
          loop={true}
          setValue={(relative, absolute) => {
            absolute;
            const idx = relative % newsSources.length;
            const key = newsSources[idx];
            return NewsSourceDict[key];
          }}

          onChange={(relative, absolute) => {
            absolute;
            const idx = relative % newsSources.length;
            const key = newsSources[idx];
            onSourceChange(key);
          }}
        />
      </div>
    </div>
  );
}
