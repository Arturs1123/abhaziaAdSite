import React from "react";

export default function Clock({ width, height }) {
  return (
    <svg
      width={width ? width : "38"}
      height={height ? height : "38"}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.8327 19.0003C34.8327 27.7448 27.7439 34.8337 18.9993 34.8337C10.2548 34.8337 3.16602 27.7448 3.16602 19.0003C3.16602 10.2558 10.2548 3.16699 18.9993 3.16699C27.7439 3.16699 34.8327 10.2558 34.8327 19.0003ZM24.2722 25.0481C24.4622 25.1748 24.668 25.2223 24.8739 25.2223C25.2697 25.2223 25.6655 25.0165 25.903 24.6365C26.2355 24.0665 26.0614 23.3381 25.4914 23.0056L20.583 20.0765C20.0922 19.7915 19.6172 18.9523 19.6172 18.3823V11.8906C19.6172 11.2415 19.0789 10.7031 18.4297 10.7031C17.7805 10.7031 17.2422 11.2415 17.2422 11.8906V18.3823C17.2422 19.7915 18.1447 21.3906 19.3639 22.119L24.2722 25.0481Z"
        fill="#FF6432"
      />
    </svg>
  );
}