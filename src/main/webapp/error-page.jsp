<%--
  Created by IntelliJ IDEA.
  User: Lisa
  Date: 22.11.2022
  Time: 2:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    ServletContext context = request.getServletContext();
    out.println(context.getAttribute("answer"));
        out.println(response.getStatus());
        out.println("ruiei");

%>
</body>
</html>
