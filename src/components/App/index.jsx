import React from "react";
import { Router } from "@reach/router";
import "./App.scss";
import Blog from "../Blog";
import Navbar from "../Navbar";
import Home from "../Home";
import BtnTop from "../BtnTop";
import languageEn from "../../assets/languages/en.json";
import languageRu from "../../assets/languages/ru.json";
import languageCn from "../../assets/languages/cn.json";
import NotFound from "../NotFound";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.langStore = {
            en: languageEn,
            ru: languageRu,
            cn: languageCn
        };
        this.state = {
            language: this.getUserLanguageFromInputList()
        };
    }
    getUserLanguageFromInputList() {
        const userLang = this.getUserLanguage;
        const langList = this.getLangList().map(l => l.value);
        if (langList.every(l => l.value !== userLang)) {
            return langList[0];
        }
        return userLang;
    }
    getUserLanguage() {
        return (
            navigator.language ||
            (navigator.languages && navigator.languages[0]) ||
            navigator.userLanguage ||
            "en"
        );
    }
    handleLanguage = lang => {
        this.setState({
            language: lang
        });
    };
    getLangList() {
        return Object.keys(this.langStore).map(k => {
            return { value: k, name: this.langStore[k].name };
        });
    }
    render() {
        return (
            <div className="App">
                <Navbar
                    curLang={this.state.language}
                    langList={this.getLangList()}
                    handleLanguage={this.handleLanguage}
                    text={this.langStore[this.state.language]}
                ></Navbar>
                <Router>
                    <Home
                        path="/"
                        text={this.langStore[this.state.language]}
                    ></Home>
                    <Blog path="blog"></Blog>
                    <NotFound default></NotFound>
                </Router>
                <BtnTop></BtnTop>
            </div>
        );
    }
}

export default App;
