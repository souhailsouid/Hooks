import React from 'react'
import Alert from 'react-bootstrap/Alert'

 const NotificationError= (props) =>


<Alert variant="danger" onClose={props.onClose}  dismissible>
  <p>
    {props.error}
  </p>
</Alert>

export default NotificationError