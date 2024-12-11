import React from "react";

const DegreeCard = ({
  degree,
  degree_,
  title,
  link,
  university,
  minLivingCost,
  maxLivingCost,
  livingCostCurrency,
  tuitionFees,
}) => {
 
    return (
    <div className="card my-3 shadow-sm" style={{ width: "auto" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{degree}</h6>
        <p className="card-text">
          <strong>University:</strong> {university} <br />
          <strong>Living Costs:</strong> {minLivingCost} {livingCostCurrency} - {maxLivingCost} {livingCostCurrency} <br />
          <strong>Tuition Fees:</strong>
          <ul className="mt-2">
            {tuitionFees.map((fee, index) => (
              <li key={index} style={{ marginLeft: "1rem" }}>
                <strong> {fee.target}</strong>: {fee.amount} {fee.currency} per {fee.unit}
              </li>
            ))}
          </ul>
        </p>
        {link && (
          <a href={`https://${degree_}${degree_!="phd"?"s":""}portal.com`+link} className="btn btn-primary" target="_blank" >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

export default DegreeCard;
