<?php
/**
 * @package Rahisi
 * @copyright (C) 2026 Rahisi Contributors
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Rahisi\Plugin\System\Rahisi\Extension\Rahisi;

return new class () implements ServiceProviderInterface {
    public function register(Container $container): void
    {
        $container->set(PluginInterface::class, function (Container $container) {
            // Joomla 6.1 config-only CMSPlugin constructor; no legacy dispatcher argument.
            $plugin = new Rahisi((array) PluginHelper::getPlugin('system', 'rahisi'));
            $plugin->setApplication(Factory::getApplication());

            return $plugin;
        });
    }
};
