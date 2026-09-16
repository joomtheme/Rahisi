<?php
/**
 * @package Rahisi
 * @copyright (C) 2026 Rahisi Contributors
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

class Pkg_RahisiInstallerScript
{
    public function preflight($type, $parent): bool
    {
        // Do not block removal on an unsupported version or after parent removal.
        if ($type === 'uninstall') {
            return true;
        }

        $app = Factory::getApplication();
        $app->getLanguage()->load('pkg_rahisi.sys', __DIR__);

        if (
            version_compare(JVERSION, '6.1.0', '<')
            || version_compare(JVERSION, '7.0.0', '>=')
            || version_compare(PHP_VERSION, '8.3.0', '<')
            || !is_file(JPATH_SITE . '/templates/cassiopeia/templateDetails.xml')
        ) {
            $app->enqueueMessage(Text::_('PKG_RAHISI_REQUIREMENTS'), 'error');

            return false;
        }

        return true;
    }
}
