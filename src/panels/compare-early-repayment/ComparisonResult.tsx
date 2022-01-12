import React from "react";
import Bold from "../../components/Bold";
import formatPennies from "../../util/currency-formatter";

const ComparisonResult = ({
  comparisonResult,
}: {
  comparisonResult: number;
}) => (
  <p>
    {comparisonResult > 0 ? (
      <>
        Focus on Investment! You'll be{" "}
        <Bold>{formatPennies(comparisonResult)} better off</Bold>.
      </>
    ) : (
      <>
        Repay Early! You'll be{" "}
        <Bold>{formatPennies(Math.abs(comparisonResult))} better off</Bold>.
      </>
    )}
  </p>
);

export default ComparisonResult;
