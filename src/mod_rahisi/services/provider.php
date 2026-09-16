<?php
/**
 * @package Rahisi
 * @copyright (C) 2026 Rahisi Contributors
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\HelperFactory;
use Joomla\CMS\Extension\Service\Provider\Module;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

return new class () implements ServiceProviderInterface {
    public function register(Container $container): void
    {
        $container->registerServiceProvider(new ModuleDispatcherFactory('\\Rahisi\\Module\\Rahisi'));
        $container->registerServiceProvider(new HelperFactory('\\Rahisi\\Module\\Rahisi\\Site\\Helper'));
        $container->registerServiceProvider(new Module());
    }
};
