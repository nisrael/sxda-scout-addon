/*
 * Copyright (c) 2010-2023 BSI Business Systems Integration AG
 * Copyright (c) 2023 Nils Israel
 *
 * This program is based on work from the Eclipse Scout Project
 * https://www.eclipse.org/scout/ and provides an extension for it.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package io.sxda.scout.addon.monaco.ui.html.json;

import io.sxda.scout.addon.monaco.ui.html.ResourceBase;
import org.eclipse.scout.rt.platform.Order;
import org.eclipse.scout.rt.ui.html.json.IDefaultValuesConfigurationContributor;

import java.net.URL;

@Order(5450)
public class DefaultValuesConfigurationContributor implements IDefaultValuesConfigurationContributor {

  @Override
  public URL contributeDefaultValuesConfigurationUrl() {
    return ResourceBase.class.getResource("json/defaultValues.json");
  }
}
