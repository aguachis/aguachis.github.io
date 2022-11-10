function currencyFormat(fld, milSep, decSep, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;

    if (whichCode == 13) return true; // Enter  
    if ((whichCode == 9 || whichCode == 8 || whichCode == 0)) {
        return true;
    }

    key = String.fromCharCode(whichCode); // Get key value from key code
    if (strCheck.indexOf(key) == -1) return false; // Not a valid key    
    len = fld.value.length;
    if (len > 15) return false;
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
                //    aux2 += milSep; //evitar se presente la coma en campos valor da conflicto con Oracle
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

function validaIdentificacion(valor) {
    if (!valor) {
        return 0;
    }
    var numero = valor;
    var tipo;
    var ok = 1;
    for (i = 0; i < numero.length && ok == 1; i++) {
        var n = parseInt(numero.charAt(i));
        if (isNaN(n)) ok = 0;
    }
    if (ok == 1) {
        if (numero.length <= 10) {
            tipo = 'C'
        } else {
            tipo = 'R'
        };
    }

    if (tipo == 'C') {
        if (numero.length < 10) {
            // alert('Debe ingresar un Número de Cédula válido');
            return 1;
        } else {
            if (js_CedulaOk(numero) == '0') {
                // alert('Número de Cédula Incorrecto');
                return 2;
            }
        }
    }

    if (tipo == 'R') {
        if (numero.length < 13) {
            //alert('Debe ingresar un Número de Ruc válido');
            return 3;
        } else {
            if (js_RucOK(numero) != '3') {
                //alert('Número de RUC Incorrecto');
                return 4;
            }
        }
    }
    return 0;
}

function vrfIdentificAB(obj) { //alert(tipo);
    var num = obj;
    var tipo;
    ////alert("abb");
    var ok = 1;
    for (i = 0; i < num.length && ok == 1; i++) {
        var n = parseInt(num.charAt(i));
        if (isNaN(n)) ok = 0;
    }
    if (ok == 1) {
        if (num.length <= 10) {
            tipo = 'C';
        } else {
            if (num.length <= 13) {
                tipo = 'R';
            }
        }
    }


    if (obj == '')
        return false; //obj;

    if (tipo == 'C') {
        if (num.length < 10) {
            //alert('Debe ingresar un Número de Cédula válido');
            //obj.focus();
            return false;
        } else {
            if (js_CedulaOk(obj) == '0') {
                //alert('Número de Cédula Incorrecto');
                //obj.focus();
                return false;
            }
        }
    }

    if (tipo == 'R') {
        if (num.length < 13) {
            //alert('Debe ingresar un Número de Ruc válido');
            //obj.focus();
            return false;
        } else {
            if (js_RucOK(obj) == '0') {
                //alert('Número de RUC Incorrecto');
                //obj.focus();
                return false;
            }
        }
    }
    return true;
}


/*****************************************************************/
/*  js_CedulaOk                                                  */
/*****************************************************************/
function ValidarCedula(esCodigo) {
    var Valor;
    if (rtrim(esCodigo).length < 10)
        return 0;//If Len(RTrim(esCodigo)) < 10 Then Exit Function
    if (rtrim(esCodigo).length != 10 && rtrim(esCodigo).length != 13)
        return 0;//If Len(RTrim(esCodigo)) <> 10 And Len(RTrim(esCodigo)) <> 13 Then Exit Function

    //Valor = parseInt(rtrim(esCodigo).substr(0,2),15);//Valor = CInt(Mid(RTrim(esCodigo), 1, 2))
    Valor = parseInt(rtrim(esCodigo).substr(0, 2), 10);
    //alert("<"+rtrim(esCodigo).substr(0,2)+">");
    //alert("<"+Valor+">");
    if (Valor < 1 || Valor > 24)
        return 0;//If Valor < 1 Or Valor > 21 Then Exit Function

    //Valor = parseInt(rtrim(esCodigo).substr(2,1),15);//Valor = CInt(Mid(RTrim(esCodigo), 3, 1))
    Valor = parseInt(rtrim(esCodigo).substr(2, 1), 10);
    //alert("<"+Valor+">");

    if (Valor != 6 && Valor != 8 && Valor != 9) {//If Valor <> 6 And Valor <> 8 And Valor <> 9 Then
        Pesos = "212121212";//Pesos = "212121212"
        Modulo = 10;//Modulo = 10
        Posicion = 10;//Posicion = 10
    } else {//Else
        Modulo = 11;//Modulo = 11
        if (Valor == 9) {//If Valor = 9 Then
            //Pesos = "432765432": Posicion = 10
            Pesos = "432765432";
            Posicion = 10;
        } else {//Else
            //Pesos = "32765432": Posicion = 9
            Pesos = "32765432";
            Posicion = 9;
        }//End If
    }//End If

    Tmp = 0;//Tmp = 0
    Total = 0;//Total = 0 
    Residuo = 0;//Residuo = 0
    Valor = 0;//Valor = 0

    if (Modulo == 10) {//If Modulo = 10 Then
        Cont = 1;//Cont = 1
        while (Cont < Posicion) {//Do While Cont < Posicion
            //Tmp = parseInt(esCodigo.substr(Cont-1,1),15) * parseInt(Pesos.substr(Cont-1,1),15);//Tmp = CInt(Mid(esCodigo, Cont, 1)) * CInt(Mid(Pesos, Cont, 1))
            Tmp = parseInt(esCodigo.substr(Cont - 1, 1), 10) * parseInt(Pesos.substr(Cont - 1, 1), 10);
            //alert(Tmp);
            if (Tmp > 9)//If Tmp > 9 Then
                Total = Total + (Tmp - 9);//Total = Total + (Tmp - 9)
            else//Else
                Total = Total + Tmp;//Total = Total + Tmp
            //End If
            Cont = Cont + 1;//Cont = Cont + 1
        }//Loop
        Residuo = Total % Modulo;//Residuo = Total Mod Modulo
        if (Residuo >= (Modulo - 9))
            Residuo = Modulo - Residuo;//If Residuo >= (Modulo - 9) Then Residuo = Modulo - Residuo
    } else {//Else
        Cont = 1;//Cont = 1
        while (Cont < Posicion) {//Do While Cont < Posicion
            //Tmp = parseInt(esCodigo.substr(Cont-1,1),15) * parseInt(Pesos.substr(Cont-1,1),15);//Tmp = CInt(Mid(esCodigo, Cont, 1)) * CInt(Mid(Pesos, Cont, 1))
            Tmp = parseInt(esCodigo.substr(Cont - 1, 1), 10) * parseInt(Pesos.substr(Cont - 1, 1), 10);
            Total = Total + Tmp;
            Cont = Cont + 1;//Total = Total + Tmp: Cont = Cont + 1
        }//Loop

        Residuo = Modulo - (Total % Modulo);//Residuo = Modulo - (Total Mod Modulo)
        if (Residuo == Modulo)
            Residuo = 0;//If Residuo = Modulo Then Residuo = 0
    }//End If
    //Valor=parseInt(esCodigo.substr(Posicion-1,1),15);//Valor = CInt(Mid(esCodigo, Posicion, 1))
    Valor = parseInt(esCodigo.substr(Posicion - 1, 1), 10);
    if (Residuo == Valor)
        return 1;//If Residuo = Valor Then vb_CedulaOK = "1"
    return 0;
}//End Function



/*=============================================================*
' FUNCION : Valida ruc.                                       *
' Recibe parámetros : ruc   --> # de RUC a validar.           *
' Retorna :             0   --> ok                            *
'                       1   --> Error en Provincia            *
'                       2   --> Error en digito verificador   *
'                       3   --> Debe haber una principal      *
'=============================================================*/
function ValidarRuc(Ruc) {
    var I, acum, dig2, dig1;
    var paso;
    var Cadena;
    var Valida_Ruc;

    //vb_RucOK = "0"

    Valida_Ruc = 0;//Valida_Ruc = 0

    if (isNaN(Ruc)) {//if not isNumeric(Ruc) then
        return 0;//exit function
    }//end if

    i = Ruc.substr(0, 2);//I = cdbl(Mid(Ruc, 1, 2))

    if (i > 22 || i < 1) {//If I > 22 Or I < 1 Then
        Valida_Ruc = 1;//Valida_Ruc = 1	'	Error en provincia
        //exit function
        return Valida_Ruc;
    }//End If

    paso = Ruc.substr(10, 3);//paso = Mid(Ruc, 11, 3)
    if (Ruc.substr(2, 1) == "9" && paso == "000") {//If Mid(Ruc, 3, 1) = "9" And paso = "000" Then
        Valida_Ruc = 3;//Valida_Ruc = 3	'	Error por lo menos debe haber una principal
        //exit function
        return Valida_Ruc;
    }//End If

    paso = Ruc.substr(9, 4);//paso = Mid(Ruc, 10, 4)
    if ((Ruc.substr(2, 1) == "6" && paso == "0000") || (Ruc.substr(2, 1) == "8" && paso == "0000")) {//If (Mid(Ruc, 3, 1) = "6" And paso = "0000") Or (Mid(Ruc, 3, 1) = "8" And paso = "0000") Then
        Valida_Ruc = 3;//Valida_Ruc = 3	'	Error por lo menos debe haber una principal
        //exit function
        return Valida_Ruc;
    }//End If

    //if (Ruc.substr(2, 1) != "6" && Ruc.substr(2, 1) != 8 && Ruc.substr(2, 1) != 9) {//If Mid(Ruc, 3, 1) <> "6" And Mid(Ruc, 3, 1) <> "8" And Mid(Ruc, 3, 1) <> "9" Then
    //    Valida_Ruc = 3;//Valida_Ruc = 3 
    //    //exit function
    //    return Valida_Ruc;
    //}//End If

    if (Ruc.substr(2, 1) == "9") {//If Mid(Ruc, 3, 1) = "9" Then
        acum = 0;//acum = 0
        Cadena = "432765432";//Cadena = "432765432"
        for (i = 1; i <= 9; i++) {//For I = 1 To 9
            dig1 = parseFloat(Cadena.substr(i - 1, 1));//dig1 = cdbl(Mid(Cadena, I, 1))
            dig2 = parseFloat(Ruc, i, 1);//dig2 = cdbl(Mid(Ruc, I, 1))
            acum = acum + (dig1 * dig2);//acum = acum + (dig1 * dig2)
        }//Next
        acum = 11 - (acum % 11);//acum = 11 - (acum Mod 11)

        if (acum = 11)
            acum = 0;//If acum = 11 Then acum = 0

        if (parseFloat(Ruc.substr(9, 1)) != acum) {//If cdbl(Mid(Ruc, 10, 1)) <> acum Then
            Valida_Ruc = 2;//Valida_Ruc = 2 ' Error en dígito verificador
            return Valida_Ruc;//exit function
            //return 2;
        }//End If
    }//End If

    if (Ruc.substr(2, 1) == "6" || Ruc.substr(2, 1) == "8") {//If Mid(Ruc, 3, 1) = "6" Or Mid(Ruc, 3, 1) = "8" Then
        acum = 0;//acum = 0
        Cadena = "32765432";//Cadena = "32765432"
        for (i = 1; i <= 8; i++) {//For I = 1 To 8
            dig1 = parseFloat(Cadena.substr(i - 1, 1));//dig1 = cdbl(Mid(Cadena, I, 1))
            dig2 = parseFloat(Ruc.substr(i - 1, 1));//dig2 = cdbl(Mid(Ruc, I, 1))
            acum = acum + (dig1 * dig2);//acum = acum + (dig1 * dig2)
        }//Next 
        acum = 11 - (acum % 11);//acum = 11 - (acum Mod 11)
        if (acum == 11)
            acum = 0;//If acum = 11 Then acum = 0

        if (parseFloat(Ruc.substr(8, 1)) != acum) {//If cdbl(Mid(Ruc, 9, 1)) <> acum Then
            Valida_Ruc = 2;//Valida_Ruc = 2 ' Error en dígito verificador
            return Valida_Ruc;//exit function
            //return 2;
        }//End If
    }//End If

    return 1;//vb_RucOK = "1"
}
//End Function  

function isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        return 'mobile';
      }else{
        // false for not mobile device
        return 'web';
    }
}