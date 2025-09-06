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
package io.sxda.scout.addon.codemirror.ui.html.json;

import io.sxda.scout.addon.codemirror.ui.html.ResourceBase;
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

