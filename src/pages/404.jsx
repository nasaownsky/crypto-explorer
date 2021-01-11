import React from "react"
import { Link } from "react-router-dom";
import { Result, Button } from "antd"

const Page404 = ({title}) => {
  return (
    <div className="page404">
      <Result
        status="404"
        title="404"
        subTitle={title || "Sorry, the page you visited does not exist!"}
        extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
      />
    </div>
  )
}

export default Page404
