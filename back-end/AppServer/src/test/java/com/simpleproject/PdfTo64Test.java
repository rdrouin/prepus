package com.simpleproject;

import org.junit.Rule;
import org.junit.Test;

import main.java.com.simpleproject.PdfTo64;
import org.junit.rules.ExpectedException;

import static org.junit.Assert.*;

/**
 * Created by AustinDidierTran on 2017-07-18.
 */
public class PdfTo64Test {
    @Rule
    public final ExpectedException exception = ExpectedException.none();

    @Test
    public void encoderDoesNotExist() throws Exception {
        exception.expect(Exception.class);
        PdfTo64.encoder("doesnotexist.pdf");
    }

    @Test
    public void encoderWrongType() throws Exception {
        exception.expect(UnsupportedOperationException.class);
        PdfTo64.encoder("doesnotexist.xls");
    }
}