//Verificar el numero de cuenta 
//Se utiliza en ingreso de orden rapida  
function DigitoControl(num) {
    var CuentaOK = new Boolean;
    var W_DigitosCuenta = new Array(0, 0, 0, 0, 0, 0, 0, 0);
    var I;
    var numero;
    var Div_Rem;

    for (I = 0; I < 8; I++) {
        W_DigitosCuenta[I] = parseInt(num.charAt(I));
    }

    numero = 0
    I = 8

    while (I > 1) {
        numero = numero + parseFloat(W_DigitosCuenta[8 - I]) * I;
        I = I - 1;
    }

    if (numero == 0) { return false; }

    Div_Rem = (numero % 11);

    if (Div_Rem == 1 && parseFloat(W_DigitosCuenta[7]) == 7) { CuentaOK = true }
    if (parseFloat(11 - Div_Rem) == parseFloat(W_DigitosCuenta[7])) { CuentaOK = true }
    if (Div_Rem == 0 && parseFloat(W_DigitosCuenta[7]) == 0) { CuentaOK = true }


    if (CuentaOK == false) { return false; } else { return true; }


    //   var cifras = new Array(1,2,4,8,5,10,9,7,3,6);
    //   var chequeo = 0;
    //   
    //   for (var i=0; i<8; i++){
    //    chequeo += parseInt(cadena.charAt(i)) * cifras[i];
    //   }
    //   chequeo = 11 - (chequeo % 11);
    //   if (chequeo == 11) {chequeo = 0;}
    //   if (chequeo == 10) {chequeo = 1;}
    //   return chequeo;

}
/*****************************************************************/
/*  js_CedulaOk                                                  */
/*****************************************************************/
function js_CedulaOk(esCodigo) {
    var Valor;
    if (rtrim(esCodigo).length < 10)
        return 0; //If Len(RTrim(esCodigo)) < 10 Then Exit Function
    if (rtrim(esCodigo).length != 10 && rtrim(esCodigo) != 13)
        return 0; //If Len(RTrim(esCodigo)) <> 10 And Len(RTrim(esCodigo)) <> 13 Then Exit Function

    //Valor = parseInt(rtrim(esCodigo).substr(0,2),15);//Valor = CInt(Mid(RTrim(esCodigo), 1, 2))
    Valor = parseInt(rtrim(esCodigo).substr(0, 2), 10);
    //alert("<"+rtrim(esCodigo).substr(0,2)+">");
    //alert("<"+Valor+">");
    if (Valor < 1 || Valor > 24)
        return 0; //If Valor < 1 Or Valor > 21 Then Exit Function

    //Valor = parseInt(rtrim(esCodigo).substr(2,1),15);//Valor = CInt(Mid(RTrim(esCodigo), 3, 1))
    Valor = parseInt(rtrim(esCodigo).substr(2, 1), 10);
    //alert("<"+Valor+">");

    if (Valor != 6 && Valor != 8 && Valor != 9) { //If Valor <> 6 And Valor <> 8 And Valor <> 9 Then
        Pesos = "212121212"; //Pesos = "212121212"
        Modulo = 10; //Modulo = 10
        Posicion = 10; //Posicion = 10
    } else { //Else
        Modulo = 11; //Modulo = 11
        if (Valor == 9) { //If Valor = 9 Then
            //Pesos = "432765432": Posicion = 10
            Pesos = "432765432";
            Posicion = 10;
        } else { //Else
            //Pesos = "32765432": Posicion = 9
            Pesos = "32765432";
            Posicion = 9;
        } //End If
    } //End If

    Tmp = 0; //Tmp = 0
    Total = 0; //Total = 0 
    Residuo = 0; //Residuo = 0
    Valor = 0; //Valor = 0

    if (Modulo == 10) { //If Modulo = 10 Then
        Cont = 1; //Cont = 1
        while (Cont < Posicion) { //Do While Cont < Posicion
            //Tmp = parseInt(esCodigo.substr(Cont-1,1),15) * parseInt(Pesos.substr(Cont-1,1),15);//Tmp = CInt(Mid(esCodigo, Cont, 1)) * CInt(Mid(Pesos, Cont, 1))
            Tmp = parseInt(esCodigo.substr(Cont - 1, 1), 10) * parseInt(Pesos.substr(Cont - 1, 1), 10);
            //alert(Tmp);
            if (Tmp > 9) //If Tmp > 9 Then
                Total = Total + (Tmp - 9); //Total = Total + (Tmp - 9)
            else //Else
                Total = Total + Tmp; //Total = Total + Tmp
            //End If
            Cont = Cont + 1; //Cont = Cont + 1
        } //Loop
        Residuo = Total % Modulo; //Residuo = Total Mod Modulo
        if (Residuo >= (Modulo - 9))
            Residuo = Modulo - Residuo; //If Residuo >= (Modulo - 9) Then Residuo = Modulo - Residuo
    } else { //Else
        Cont = 1; //Cont = 1
        while (Cont < Posicion) { //Do While Cont < Posicion
            //Tmp = parseInt(esCodigo.substr(Cont-1,1),15) * parseInt(Pesos.substr(Cont-1,1),15);//Tmp = CInt(Mid(esCodigo, Cont, 1)) * CInt(Mid(Pesos, Cont, 1))
            Tmp = parseInt(esCodigo.substr(Cont - 1, 1), 10) * parseInt(Pesos.substr(Cont - 1, 1), 10);
            Total = Total + Tmp;
            Cont = Cont + 1; //Total = Total + Tmp: Cont = Cont + 1
        } //Loop

        Residuo = Modulo - (Total % Modulo); //Residuo = Modulo - (Total Mod Modulo)
        if (Residuo == Modulo)
            Residuo = 0; //If Residuo = Modulo Then Residuo = 0
    } //End If
    //Valor=parseInt(esCodigo.substr(Posicion-1,1),15);//Valor = CInt(Mid(esCodigo, Posicion, 1))
    Valor = parseInt(esCodigo.substr(Posicion - 1, 1), 10);
    if (Residuo == Valor)
        return 1; //If Residuo = Valor Then vb_CedulaOK = "1"
    return 0;
} //End Function

/*******************************************************************/
/*  js_CedulaOk                                                    */
/* devuelve la cadena sin espacios en blanco al comienzo y al final*/
/*******************************************************************/
function trim(s) {
    return removeLeadingAndTrailingChar(s, ' '); //o puede ser tambien return rtrim(ltrim(s));
}

/*****************************************************************/
/*  rtrim                                                        */
/*  devuelve la cadena sin espacios en blanco al final           */
/*****************************************************************/
function rtrim(s) { return removeTrailingChar(s, ' '); }


/*****************************************************************/
/*  ltrim                                                        */
/* devueleve la cadena sin espacios en blanco al comienzo        */
/*****************************************************************/
function ltrim(s) { return removeLeadingChar(s, ' '); }

/*=============================================================*
' FUNCION : Valida ruc.                                       *
' Recibe par�metros : ruc   --> # de RUC a validar.           *
' Retorna :             0   --> ok                            *
'                       1   --> Error en Provincia            *
'                       2   --> Error en digito verificador   *
'                       3   --> Debe haber una principal      *
'=============================================================*/
function js_RucOK(Ruc) {
    var I, acum, dig2, dig1;
    var paso;
    var Cadena;
    var Valida_Ruc;

    //vb_RucOK = "0"

    Valida_Ruc = 0; //Valida_Ruc = 0

    if (isNaN(Ruc)) { //if not isNumeric(Ruc) then
        return 0; //exit function
    } //end if

    i = Ruc.substr(0, 2); //I = cdbl(Mid(Ruc, 1, 2))

    if (i > 22 || i < 1) { //If I > 22 Or I < 1 Then
        Valida_Ruc = 1; //Valida_Ruc = 1	'	Error en provincia
        //exit function
        return Valida_Ruc;
    } //End If

    paso = Ruc.substr(10, 3); //paso = Mid(Ruc, 11, 3)
    if (Ruc.substr(2, 1) == "9" && paso == "000") { //If Mid(Ruc, 3, 1) = "9" And paso = "000" Then
        Valida_Ruc = 3; //Valida_Ruc = 3	'	Error por lo menos debe haber una principal
        //exit function
        return Valida_Ruc;
    } //End If

    paso = Ruc.substr(9, 4); //paso = Mid(Ruc, 10, 4)
    if ((Ruc.substr(2, 1) == "6" && paso == "0000") || (Ruc.substr(2, 1) == "8" && paso == "0000")) { //If (Mid(Ruc, 3, 1) = "6" And paso = "0000") Or (Mid(Ruc, 3, 1) = "8" And paso = "0000") Then
        Valida_Ruc = 3; //Valida_Ruc = 3	'	Error por lo menos debe haber una principal
        //exit function
        return Valida_Ruc;
    } //End If

    if (Ruc.substr(2, 1) != "6" && Ruc.substr(2, 1) != 8 && Ruc.substr(2, 1) != 9) { //If Mid(Ruc, 3, 1) <> "6" And Mid(Ruc, 3, 1) <> "8" And Mid(Ruc, 3, 1) <> "9" Then
        Valida_Ruc = 3; //Valida_Ruc = 3 
        //exit function
        return Valida_Ruc;
    } //End If

    if (Ruc.substr(2, 1) == "9") { //If Mid(Ruc, 3, 1) = "9" Then
        acum = 0; //acum = 0
        Cadena = "432765432"; //Cadena = "432765432"
        for (i = 1; i <= 9; i++) { //For I = 1 To 9
            dig1 = parseFloat(Cadena.substr(i - 1, 1)); //dig1 = cdbl(Mid(Cadena, I, 1))
            dig2 = parseFloat(Ruc, i, 1); //dig2 = cdbl(Mid(Ruc, I, 1))
            acum = acum + (dig1 * dig2); //acum = acum + (dig1 * dig2)
        } //Next
        acum = 11 - (acum % 11); //acum = 11 - (acum Mod 11)

        if (acum = 11)
            acum = 0; //If acum = 11 Then acum = 0

        if (parseFloat(Ruc.substr(9, 1)) != acum) { //If cdbl(Mid(Ruc, 10, 1)) <> acum Then
            Valida_Ruc = 2; //Valida_Ruc = 2 ' Error en d�gito verificador
            return Valida_Ruc; //exit function
            //return 2;
        } //End If
    } //End If

    if (Ruc.substr(2, 1) == "6" || Ruc.substr(2, 1) == "8") { //If Mid(Ruc, 3, 1) = "6" Or Mid(Ruc, 3, 1) = "8" Then
        acum = 0; //acum = 0
        Cadena = "32765432"; //Cadena = "32765432"
        for (i = 1; i <= 8; i++) { //For I = 1 To 8
            dig1 = parseFloat(Cadena.substr(i - 1, 1)); //dig1 = cdbl(Mid(Cadena, I, 1))
            dig2 = parseFloat(Ruc.substr(i - 1, 1)); //dig2 = cdbl(Mid(Ruc, I, 1))
            acum = acum + (dig1 * dig2); //acum = acum + (dig1 * dig2)
        } //Next 
        acum = 11 - (acum % 11); //acum = 11 - (acum Mod 11)
        if (acum == 11)
            acum = 0; //If acum = 11 Then acum = 0

        if (parseFloat(Ruc.substr(8, 1)) != acum) { //If cdbl(Mid(Ruc, 9, 1)) <> acum Then
            Valida_Ruc = 2; //Valida_Ruc = 2 ' Error en d�gito verificador
            return Valida_Ruc; //exit function
            //return 2;
        } //End If
    } //End If

    return 1; //vb_RucOK = "1"
}
//End Function     

/*****************************************************************/
/*  removeLeadingChar                                            */
/*  Remueve el caracter especifico al principo de la cadena      */
/*****************************************************************/
function removeLeadingChar(inputString, removeChar) {
    var returnString = inputString;
    if (removeChar.length) {
        while ('' + returnString.charAt(0) == removeChar) {
            returnString = returnString.substring(1, returnString.length);
        }
    }
    return returnString;
}

/*****************************************************************/
/*  removeTrailingChar                                           */
/*  remueve el caracter especifico al final de la cadena         */
/*****************************************************************/
function removeTrailingChar(inputString, removeChar) {
    var returnString = inputString;
    if (removeChar.length) {
        while ('' + returnString.charAt(returnString.length - 1) == removeChar) {
            returnString = returnString.substring(0, returnString.length - 1);
        }
    }
    return returnString;
}

/*******************************************************************/
/*  removeLeadingAndTrailingChar                                   */
/* remueve el caracter especifico al comienzo y final de la cadena */
/*******************************************************************/
function removeLeadingAndTrailingChar(inputString, removeChar) {
    var returnString = inputString;
    if (removeChar.length) {
        while ('' + returnString.charAt(0) == removeChar) {
            returnString = returnString.substring(1, returnString.length);
        }
        while ('' + returnString.charAt(returnString.length - 1) == removeChar) {
            returnString = returnString.substring(0, returnString.length - 1);
        }
    }
    return returnString;
}

/*****************************************************************/
/*  EliminarCaracter                                             */
/*  Elimina un caracter                                          */
/*****************************************************************/
function EliminarCaracter(num, cad) {
    if (num.indexOf(cad) >= 0) {
        var splitStr = num.split(cad);
        var splitLeft = splitStr[0];
        var splitRight = splitStr[1];
        return splitLeft + splitRight;
    } else
        return num;
}

/*****************************************************************/
/*  formatNumber                                                 */
/*  FORMATEA UN VALOR A MILES Y DOS DECIMALES                    */
/*****************************************************************/
function formatNumber(num) {
    num += '';
    if (num.indexOf(',') >= 0)
        num.value = parseFloat(num);
    else
        num.value = parseInt(num, 10);

    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var ceros = ""
    var splitRight = splitStr.length > 1 ? '.' + splitStr[1].substring(0, 2) : '.00';

    for (i = 0; i < (3 - splitRight.length); i++)
        splitRight += '0';

    var regx = /(\d+)(\d{3})/;

    while (regx.test(splitLeft)) { splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2'); }

    return splitLeft + splitRight;
}


function formatNumberBlur(num) {
    num += '';
    if (num.indexOf('.') <= 0) { num.value += '.00'; }

    if (num.indexOf(',') >= 0) { num.value = parseFloat(num); } else {
        if (num.indexOf('.') > 0) { num.value = parseFloat(num); } else { num.value = parseInt(num, 10); }
    }

    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var ceros = ""
    var splitRight = splitStr.length > 1 ? '.' + rtrim(splitStr[1].substring(0, 2)) : '.00';

    for (i = 0; i < (3 - splitRight.length); i++)
        splitRight += '0';

    if (splitLeft == '') { splitLeft = '0'; } else {
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) { splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2'); }
    }

    return splitLeft + splitRight;
}

/***************************************************************************************************/
/*                                                                                                 */
/*  FORMATEA UN VALOR A MILES Y DOS DECIMALES mientras se va ingresando el valor                   */
/***************************************************************************************************/
function currencyFormat(fld, milSep, decSep, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;

    if (whichCode == 13) return true; // Enter  
    key = String.fromCharCode(whichCode); // Get key value from key code
    len = fld.value.length;
    for (i = 0; i < len; i++)
        if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(fld.value.charAt(i)) != -1) aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) fld.value = '';
    if (len == 1) fld.value = '0' + decSep + '0' + aux;
    if (len == 2) fld.value = '0' + decSep + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += milSep;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            fld.value += aux2.charAt(i);
        fld.value += decSep + aux.substr(len - 2, len);
    }
    return false;
}

function currencyFormatBlur(fld, milSep, decSep, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;

    if (whichCode == 13) return true; // Enter  
    key = String.fromCharCode(whichCode); // Get key value from key code
    len = fld.value.length;
    for (i = 0; i < len; i++)
        if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(fld.value.charAt(i)) != -1) aux += fld.value.charAt(i);
        //aux = aux; // + key;
    len = aux.length;
    if (len == 0) fld.value = '';
    if (len == 1) fld.value = '0' + decSep + '0' + aux;
    if (len == 2) fld.value = '0' + decSep + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += milSep;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            fld.value += aux2.charAt(i);
        fld.value += decSep + aux.substr(len - 2, len);
    }
    return false;
}
/*=============================================================*
' FUNCION : validaTodo.                                       *
' Recibe par�metros : nuc   --> # de nuc a validar.           *
' ya sea este tipo cedula, ruc o pasaporte                    *
' Retorna :             true   --> ok                         *
'                       false   --> error                     *
'=============================================================*/
function validaTodo(obj) {
    var numero = obj.value;
    var suma = 0;
    var residuo = 0;
    var pri = false;
    var pub = false;
    var nat = false;
    var numeroProvincias = 30;
    var modulo = 11;

    /* Verifico que el campo no contenga letras */
    var ok = 1;
    for (i = 0; i < numero.length && ok == 1; i++) {
        var n = parseInt(numero.charAt(i), 10);
        if (isNaN(n)) ok = 0;
    }
    if (ok == 0) {
        alert('No puede ingresar caracteres en el n' + String.fromCharCode(250) + 'mero');
        return false;
    }

    if (numero.length < 10) {
        alert('El n' + String.fromCharCode(250) + 'mero ingresado no es v' + String.fromCharCode(225) + 'lido');
        return false;
    }

    /* Los primeros dos digitos corresponden al codigo de la provincia */
    provincia = numero.substr(0, 2);
    if (provincia < 1 || provincia > numeroProvincias) {
        alert('El c' + String.fromCharCode(243) + 'digo de la provincia (dos primeros d' + String.fromCharCode(237) + 'gitos) es inv' + String.fromCharCode(225) + 'lido');
        return false;
    }

    /* Aqui almacenamos los digitos de la cedula en variables. */
    d1 = numero.substr(0, 1);
    d2 = numero.substr(1, 1);
    d3 = numero.substr(2, 1);
    d4 = numero.substr(3, 1);
    d5 = numero.substr(4, 1);
    d6 = numero.substr(5, 1);
    d7 = numero.substr(6, 1);
    d8 = numero.substr(7, 1);
    d9 = numero.substr(8, 1);
    d10 = numero.substr(9, 1);

    /* El tercer digito es: */
    /* 9 para sociedades privadas y extranjeros   */
    /* 6 para sociedades publicas */
    /* menor que 6 (0,1,2,3,4,5) para personas naturales */

    if (d3 == 7 || d3 == 8) {
        alert('El tercer d' + String.fromCharCode(237) + 'gito ingresado es inv' + String.fromCharCode(225) + 'lido');
        return false;
    }

    /* Solo para personas naturales (modulo 10) */
    if (d3 < 6) {
        nat = true;
        p1 = d1 * 2;
        if (p1 >= 10) p1 -= 9;
        p2 = d2 * 1;
        if (p2 >= 10) p2 -= 9;
        p3 = d3 * 2;
        if (p3 >= 10) p3 -= 9;
        p4 = d4 * 1;
        if (p4 >= 10) p4 -= 9;
        p5 = d5 * 2;
        if (p5 >= 10) p5 -= 9;
        p6 = d6 * 1;
        if (p6 >= 10) p6 -= 9;
        p7 = d7 * 2;
        if (p7 >= 10) p7 -= 9;
        p8 = d8 * 1;
        if (p8 >= 10) p8 -= 9;
        p9 = d9 * 2;
        if (p9 >= 10) p9 -= 9;
        modulo = 10;
    }

    /* Solo para sociedades publicas (modulo 11) */
    /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    else if (d3 == 6) {
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
    }

    /* Solo para entidades privadas (modulo 11) */
    else if (d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
    }

    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
    residuo = suma % modulo;

    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
    digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

    /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
    if (pub == true) {
        if (digitoVerificador != d9) {
            alert('El ruc de la empresa del sector p' + String.fromCharCode(250) + 'blico es incorrecto.');
            return false;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if (numero.substr(9, 4) != '0001') {
            alert('El ruc de la empresa del sector p' + String.fromCharCode(250) + 'blico debe terminar con 0001');
            return false;
        }
    } else if (pri == true) {
        if (digitoVerificador != d10) {
            alert('El ruc de la empresa del sector privado es incorrecto.');
            return false;
        }
        if (numero.substr(10, 3) != '001') {
            alert('El ruc de la empresa del sector privado debe terminar con 001');
            return false;
        }
    } else if (nat == true) {
        if (digitoVerificador != d10) {
            alert('El n' + String.fromCharCode(250) + 'mero de c' + String.fromCharCode(233) + 'dula de la persona natural es incorrecto.');
            return false;
        }
        if (numero.length > 10 && numero.substr(10, 3) != '001') {
            alert('El ruc de la persona natural debe terminar con 001');
            return false;
        }
    }
    return true;
}

function validaFechas(fechadesde, fechahasta) {
    var str_antes = document.getElementById(fechadesde).value
    var str_despues = document.getElementById(fechahasta).value
    var fecInicio = getDateFromFormat(str_antes, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    var fecFinal = getDateFromFormat(str_despues, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    if (fecInicio > fecFinal) {
        return false;
    }
    return true;
}


function validaFechasHoy(fechadesde, fechahasta) {
    var str_antes = document.getElementById(fechadesde).value
    var str_despues = document.getElementById(fechahasta).value
    var fecInicio = getDateFromFormat(str_antes, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    var fecFinal = getDateFromFormat(str_despues, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    var fechahoy = new String('<%=Format(Date.Today,System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString())%>');
    var fecha = getDateFromFormat(fechahoy, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    if (fecInicio < fecha) {
        return false;
    }
    if (fecInicio > fecFinal) {
        return false;
    }
    return true;
}

function validaFechaHoy(fechadesde) {
    var str_antes = document.getElementById(fechadesde).value
    var fecInicio = getDateFromFormat(str_antes, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    var fechahoy = new String('<%=Format(Date.Today,System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString())%>');
    var fecha = getDateFromFormat(fechahoy, '<%=System.Configuration.ConfigurationManager.AppSettings.Get("FormatoFecha").ToString()%>');
    if (fecInicio < fecha) {
        return false;
    }
    return true;
}

function soloNumeros(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function sololetrasynumeros(e) {

    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8)
        return true; // 3
    patron = /[A-Za-z\9123456780]/; // 4
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}


