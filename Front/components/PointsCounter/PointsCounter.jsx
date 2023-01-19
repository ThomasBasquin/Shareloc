import React from "react";
import { COLOR } from "../../constant/color";
import BoxGrise from "../../components/BoxGrise/BoxGrise";

export default function PointsCounter({ points, children }) {
  return (
    <div className="points-counter">
      <BoxGrise
        style={{ width: "35em", marginRight: "12em", marginTop: "3.5em" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className="mesPoints">Mes points :</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p className="points">{points}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              classname="fill-yellow-700"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 40 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
        </div>
      </BoxGrise>
      {children}
    </div>
  );
}
