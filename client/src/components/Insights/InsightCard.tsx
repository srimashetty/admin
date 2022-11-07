import React from "react";
import "./_insightCard.scss";

const InsightCard = (props:any) => {
    return (
      <div className="status__card">
        <div className="status__card__title">
          <span>{props.title}</span>
        </div>
        <div className="status__card__info">
          <div className="status__card__info__count">
            <h4>{props.count}</h4>
          </div>{" "}
          <div className="status__card__info__icon">
            <i className={props.icon}></i>
          </div>
        </div>
      </div>
    );
  };

  export default InsightCard;