<?php
/**
 * @package Rahisi
 * @copyright (C) 2026 Rahisi Contributors
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Rahisi\Module\Rahisi\Site\Dispatcher;

defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Joomla\CMS\Plugin\PluginHelper;

final class Dispatcher extends AbstractModuleDispatcher
{
    protected function getLayoutData(): array
    {
        $data = parent::getLayoutData();
        $data['available'] = $data['app']->getTemplate() === 'rahisi'
            && PluginHelper::isEnabled('system', 'rahisi');

        return $data;
    }
}
