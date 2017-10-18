<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit App Data'), ['action' => 'edit', $appData->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete App Data'), ['action' => 'delete', $appData->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appData->id)]) ?> </li>
        <li><?= $this->Html->link(__('List App Data'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New App Data'), ['action' => 'add']) ?> </li>
    </ul>
</div>
<div class="appData view large-10 medium-9 columns">
    <h2><?= h($appData->id) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Subject') ?></h6>
            <p><?= h($appData->subject) ?></p>
            <h6 class="subheader"><?= __('LightString') ?></h6>
            <p><?= h($appData->lightString) ?></p>
            <h6 class="subheader"><?= __('ComputerString') ?></h6>
            <p><?= h($appData->computerString) ?></p>
            <h6 class="subheader"><?= __('HeaterString') ?></h6>
            <p><?= h($appData->heaterString) ?></p>
            <h6 class="subheader"><?= __('ProjectorString') ?></h6>
            <p><?= h($appData->projectorString) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($appData->id) ?></p>
            <h6 class="subheader"><?= __('App Students Unique Id') ?></h6>
            <p><?= $this->Number->format($appData->app_students_unique_id) ?></p>
            <h6 class="subheader"><?= __('Light') ?></h6>
            <p><?= $this->Number->format($appData->light) ?></p>
            <h6 class="subheader"><?= __('Computer') ?></h6>
            <p><?= $this->Number->format($appData->computer) ?></p>
            <h6 class="subheader"><?= __('Heater') ?></h6>
            <p><?= $this->Number->format($appData->heater) ?></p>
            <h6 class="subheader"><?= __('Projector') ?></h6>
            <p><?= $this->Number->format($appData->projector) ?></p>
        </div>
        <div class="large-2 columns dates end">
            <h6 class="subheader"><?= __('Date') ?></h6>
            <p><?= h($appData->date) ?></p>
            <h6 class="subheader"><?= __('Time Inserted') ?></h6>
            <p><?= h($appData->time_inserted) ?></p>
        </div>
    </div>
</div>
