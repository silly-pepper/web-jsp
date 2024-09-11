<%@ page import="java.util.LinkedList" %><%--
  Created by IntelliJ IDEA.
  User: Lisa
  Date: 22.11.2022
  Time: 1:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<table id="layout" >
    <thead>
    <td colspan="2">
        Чернова Елизавета Александровна P32302
    </td>
    </thead>

    <tbody>
    <tr>
        <td>
            <p class="center-labeled head-label">
                Таблица результатов
            </p>
            <div class="scroll-container">
                <table id="result-table">
                    <tr class="table-header">
                        <th class="coords-col">X</th>
                        <th class="coords-col">Y</th>
                        <th class="coords-col">R</th>
                        <th class="time-col">Время запроса</th>
                        <th class="time-col">Время выполнения</th>
                        <th class="hitres-col">Попадание</th>
                    </tr>
                    <tbody id = "tbody1">
                    <tr>
                        <%
                            ServletContext context = request.getServletContext();
                            if(context.getAttribute("answer") != null) {
                                LinkedList<String> answer = (LinkedList<String>) context.getAttribute("answer");
                                String last = answer.getFirst();
                                out.println(last);
                            }
                        %>
                    </tr>
                    </tbody>
                </table>
            </div>

        </td>
        <div class="form">
            <form method="get" action="update.jsp">
                <input type="submit" value='Go back' >
            </form>
        </div>

    </tr>

    </tbody>

</table>
<script charset="utf-8" src="js/jquery-3.6.0.min.js" type="text/javascript"></script>
<script charset="utf-8" src="js/lab.js" type="text/javascript"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

</body>
</html>
