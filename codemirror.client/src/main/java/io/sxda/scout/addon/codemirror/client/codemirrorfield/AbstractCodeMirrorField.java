/*
 * Copyright (c) 2010-2025 BSI Business Systems Integration AG
 * Copyright (c) 2023-2025 Nils Israel
 *
 * This program is an extension of the original work from the Eclipse Scout Project,
 * available at https://www.eclipse.org/scout/.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package io.sxda.scout.addon.codemirror.client.codemirrorfield;

import org.eclipse.scout.rt.client.ModelContextProxy;
import org.eclipse.scout.rt.client.ui.form.fields.AbstractBasicField;
import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.annotations.ConfigProperty;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("eb3f53f4-ad18-4e9d-8b94-23884fe7448a")
public abstract class AbstractCodeMirrorField extends AbstractBasicField<String> implements ICodeMirrorField {
    private static final Logger LOG = LoggerFactory.getLogger(AbstractCodeMirrorField.class);
    private ICodeMirrorFieldUIFacade m_uiFacade;
    private boolean m_enabledProcessing;

    public AbstractCodeMirrorField() {
        super(true);
    }

    @Override
    protected void initConfig() {
        m_uiFacade = BEANS.get(ModelContextProxy.class).newProxy(new AbstractCodeMirrorField.P_UIFacade(), ModelContextProxy.ModelContext.copyCurrent());
        super.initConfig();
        setTheme(getConfiguredTheme());
        setLanguage(getConfiguredLanguage());
        setTabSize(getConfiguredTabSize());
        setHighlightActiveLine(getConfiguredHighlightActiveLine());
        setSyntaxHighlighting(getConfiguredSyntaxHighlighting());
        setLineNumbers(getConfiguredLineNumbers());
        setHighlightActiveLineGutter(getConfiguredHighlightActiveLineGutter());
        setFoldGutter(getConfiguredFoldGutter());
        setDropCursor(getConfiguredDropCursor());
        setAllowMultipleSelections(getConfiguredAllowMultipleSelections());
        setIndentOnInput(getConfiguredIndentOnInput());
        setBracketMatching(getConfiguredBracketMatching());
        setCloseBrackets(getConfiguredCloseBrackets());
        setAutocompletion(getConfiguredAutocompletion());
        setRectangularSelection(getConfiguredRectangularSelection());
        setCrosshairCursor(getConfiguredCrosshairCursor());
        setHighlightSelectionMatches(getConfiguredHighlightSelectionMatches());
        setCloseBracketsKeymap(getConfiguredCloseBracketsKeymap());
        setSearchKeymap(getConfiguredSearchKeymap());
        setFoldKeymap(getConfiguredFoldKeymap());
        setCompletionKeymap(getConfiguredCompletionKeymap());
        setLintKeymap(getConfiguredLintKeymap());
        setHighlightSpecialChars(getConfiguredHighlightSpecialChars());
        setHistory(getConfiguredHistory());
        setDrawSelection(getConfiguredDrawSelection());
        setDefaultKeymap(getConfiguredDefaultKeymap());
        setHistoryKeymap(getConfiguredHistoryKeymap());
        setIndentWithTabKeymap(getConfiguredIndentWithTabKeymap());
        setLineWrapping(getConfiguredLineWrapping());
    }


    @Override
    @ConfigProperty(ConfigProperty.STRING)
    public void setTheme(String theme) {
        propertySupport.setPropertyString(PROP_THEME, theme);
    }

    @Override
    @ConfigProperty(ConfigProperty.STRING)
    public String getTheme() {
        return propertySupport.getPropertyString(PROP_THEME);
    }

    @ConfigProperty(ConfigProperty.STRING)
    protected String getConfiguredTheme() {
        return CodeMirrorTheme.AYU_LIGHT.getConfigTerm();
    }


    @Override
    @ConfigProperty(ConfigProperty.STRING)
    public void setLanguage(String language) {
        propertySupport.setPropertyString(PROP_LANGUAGE, language);
    }

    @Override
    @ConfigProperty(ConfigProperty.STRING)
    public String getLanguage() {
        return propertySupport.getPropertyString(PROP_LANGUAGE);
    }

    @ConfigProperty(ConfigProperty.STRING)
    protected String getConfiguredLanguage() {
        return CodeMirrorLanguage.NONE.getConfigTerm();
    }


    @Override
    @ConfigProperty(ConfigProperty.INTEGER)
    public void setTabSize(int tabSize) {
        propertySupport.setPropertyInt(PROP_TAB_SIZE, tabSize);
    }

    @Override
    @ConfigProperty(ConfigProperty.INTEGER)
    public int getTabSize() {
        return propertySupport.getPropertyInt(PROP_TAB_SIZE);
    }

    @ConfigProperty(ConfigProperty.INTEGER)
    protected int getConfiguredTabSize() {
        return 2;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setHighlightActiveLine(boolean highlightActiveLine) {
        propertySupport.setPropertyBool(PROP_HIGHLIGHT_ACTIVE_LINE, highlightActiveLine);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getHighlightActiveLine() {
        return propertySupport.getPropertyBool(PROP_HIGHLIGHT_ACTIVE_LINE);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredHighlightActiveLine() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setSyntaxHighlighting(boolean syntaxHighlighting) {
        propertySupport.setPropertyBool(PROP_SYNTAX_HIGHLIGHTING, syntaxHighlighting);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getSyntaxHighlighting() {
        return propertySupport.getPropertyBool(PROP_SYNTAX_HIGHLIGHTING);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredSyntaxHighlighting() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setLineNumbers(boolean lineNumbers) {
        propertySupport.setPropertyBool(PROP_LINE_NUMBERS, lineNumbers);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getLineNumbers() {
        return propertySupport.getPropertyBool(PROP_LINE_NUMBERS);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredLineNumbers() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setHighlightActiveLineGutter(boolean highlightActiveLineGutter) {
        propertySupport.setPropertyBool(PROP_HIGHLIGHT_ACTIVE_LINE_GUTTER, highlightActiveLineGutter);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getHighlightActiveLineGutter() {
        return propertySupport.getPropertyBool(PROP_HIGHLIGHT_ACTIVE_LINE_GUTTER);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredHighlightActiveLineGutter() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setFoldGutter(boolean foldGutter) {
        propertySupport.setPropertyBool(PROP_FOLD_GUTTER, foldGutter);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getFoldGutter() {
        return propertySupport.getPropertyBool(PROP_FOLD_GUTTER);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredFoldGutter() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setDropCursor(boolean dropCursor) {
        propertySupport.setPropertyBool(PROP_DROP_CURSOR, dropCursor);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getDropCursor() {
        return propertySupport.getPropertyBool(PROP_DROP_CURSOR);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredDropCursor() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setAllowMultipleSelections(boolean allowMultipleSelections) {
        propertySupport.setPropertyBool(PROP_ALLOW_MULTIPLE_SELECTIONS, allowMultipleSelections);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getAllowMultipleSelections() {
        return propertySupport.getPropertyBool(PROP_ALLOW_MULTIPLE_SELECTIONS);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredAllowMultipleSelections() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setIndentOnInput(boolean indentOnInput) {
        propertySupport.setPropertyBool(PROP_INDENT_ON_INPUT, indentOnInput);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getIndentOnInput() {
        return propertySupport.getPropertyBool(PROP_INDENT_ON_INPUT);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredIndentOnInput() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setBracketMatching(boolean bracketMatching) {
        propertySupport.setPropertyBool(PROP_BRACKET_MATCHING, bracketMatching);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getBracketMatching() {
        return propertySupport.getPropertyBool(PROP_BRACKET_MATCHING);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredBracketMatching() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setCloseBrackets(boolean closeBrackets) {
        propertySupport.setPropertyBool(PROP_CLOSE_BRACKETS, closeBrackets);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getCloseBrackets() {
        return propertySupport.getPropertyBool(PROP_CLOSE_BRACKETS);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredCloseBrackets() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setAutocompletion(boolean autocompletion) {
        propertySupport.setPropertyBool(PROP_AUTO_COMPLETION, autocompletion);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getAutocompletion() {
        return propertySupport.getPropertyBool(PROP_AUTO_COMPLETION);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredAutocompletion() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setRectangularSelection(boolean rectangularSelection) {
        propertySupport.setPropertyBool(PROP_RECTANGULAR_SELECTION, rectangularSelection);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getRectangularSelection() {
        return propertySupport.getPropertyBool(PROP_RECTANGULAR_SELECTION);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredRectangularSelection() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setCrosshairCursor(boolean crosshairCursor) {
        propertySupport.setPropertyBool(PROP_CROSSHAIR_CURSOR, crosshairCursor);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getCrosshairCursor() {
        return propertySupport.getPropertyBool(PROP_CROSSHAIR_CURSOR);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredCrosshairCursor() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setHighlightSelectionMatches(boolean highlightSelectionMatches) {
        propertySupport.setPropertyBool(PROP_HIGHLIGHT_SELECTION_MATCHES, highlightSelectionMatches);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getHighlightSelectionMatches() {
        return propertySupport.getPropertyBool(PROP_HIGHLIGHT_SELECTION_MATCHES);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredHighlightSelectionMatches() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setCloseBracketsKeymap(boolean closeBracketsKeymap) {
        propertySupport.setPropertyBool(PROP_CLOSE_BRACKETS_KEYMAP, closeBracketsKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getCloseBracketsKeymap() {
        return propertySupport.getPropertyBool(PROP_CLOSE_BRACKETS_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredCloseBracketsKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setSearchKeymap(boolean searchKeymap) {
        propertySupport.setPropertyBool(PROP_SEARCH_KEYMAP, searchKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getSearchKeymap() {
        return propertySupport.getPropertyBool(PROP_SEARCH_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredSearchKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setFoldKeymap(boolean foldKeymap) {
        propertySupport.setPropertyBool(PROP_FOLD_KEYMAP, foldKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getFoldKeymap() {
        return propertySupport.getPropertyBool(PROP_FOLD_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredFoldKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setCompletionKeymap(boolean completionKeymap) {
        propertySupport.setPropertyBool(PROP_COMPLETION_KEYMAP, completionKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getCompletionKeymap() {
        return propertySupport.getPropertyBool(PROP_COMPLETION_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredCompletionKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setLintKeymap(boolean lintKeymap) {
        propertySupport.setPropertyBool(PROP_LINT_KEYMAP, lintKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getLintKeymap() {
        return propertySupport.getPropertyBool(PROP_LINT_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredLintKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setHighlightSpecialChars(boolean highlightSpecialChars) {
        propertySupport.setPropertyBool(PROP_HIGHLIGHT_SPECIAL_CHARS, highlightSpecialChars);
    }

    @Override
    public boolean getHighlightSpecialChars() {
        return propertySupport.getPropertyBool(PROP_HIGHLIGHT_SPECIAL_CHARS);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredHighlightSpecialChars() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setHistory(boolean history) {
        propertySupport.setPropertyBool(PROP_HISTORY, history);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getHistory() {
        return propertySupport.getPropertyBool(PROP_HISTORY);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredHistory() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setDrawSelection(boolean drawSelection) {
        propertySupport.setPropertyBool(PROP_DRAW_SELECTION, drawSelection);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getDrawSelection() {
        return propertySupport.getPropertyBool(PROP_DRAW_SELECTION);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredDrawSelection() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setDefaultKeymap(boolean defaultKeymap) {
        propertySupport.setPropertyBool(PROP_DEFAULT_KEYMAP, defaultKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getDefaultKeymap() {
        return propertySupport.getPropertyBool(PROP_DEFAULT_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredDefaultKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setHistoryKeymap(boolean historyKeymap) {
        propertySupport.setPropertyBool(PROP_HISTORY_KEYMAP, historyKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getHistoryKeymap() {
        return propertySupport.getPropertyBool(PROP_HISTORY_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredHistoryKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setIndentWithTabKeymap(boolean indentWithTabKeymap) {
        propertySupport.setPropertyBool(PROP_INDENT_WITH_TAB_KEYMAP, indentWithTabKeymap);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getIndentWithTabKeymap() {
        return propertySupport.getPropertyBool(PROP_INDENT_WITH_TAB_KEYMAP);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredIndentWithTabKeymap() {
        return true;
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public void setLineWrapping(boolean lineWrapping) {
        propertySupport.setPropertyBool(PROP_LINE_WRAPPING, lineWrapping);
    }

    @Override
    @ConfigProperty(ConfigProperty.BOOLEAN)
    public boolean getLineWrapping() {
        return propertySupport.getPropertyBool(PROP_LINE_WRAPPING);
    }

    @ConfigProperty(ConfigProperty.BOOLEAN)
    protected boolean getConfiguredLineWrapping() {
        return true;
    }

    @Override
    protected String parseValueInternal(String text) {
        if (text != null && text.isEmpty()) {
            text = null;
        }
        return text;
    }

    @Override
    public ICodeMirrorFieldUIFacade getUIFacade() {
        return m_uiFacade;
    }

    protected class P_UIFacade extends AbstractBasicField<?>.P_UIFacade implements ICodeMirrorFieldUIFacade {
    }
}
