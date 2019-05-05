package com.itd.efiling.offline.ITR4.ctrl;

import com.itd.efiling.offline.common.player.ctrl.CommonLayoutController;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;

public class AboutController extends CommonLayoutController {

    @FXML
    ImageView logoView;

    @FXML
    Label version, asstYear, itr;

    public Label getAsstYear() {
        return asstYear;
    }

    public void setAsstYear(final String asstYear) {
        this.asstYear.setText(asstYear);
    }

    public Label getItr() {
        return itr;
    }

    public void setItr(final String itr) {
        this.itr.setText(itr);
    }

    public Label getVersion() {
        return version;
    }

    public void setVersion(final String version) {
        this.version.setText(version);
    }

}
